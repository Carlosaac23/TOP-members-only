import { Strategy } from 'passport-local';
import passport from 'passport';
import { pool } from '../db/pool.js';
import { validateHashedPassword } from '../helpers/validatePassword.js';

export async function verifyCallback(username, password, done) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return done(null, false);
    }

    const isValid = await validateHashedPassword(password, user.password_hash);

    if (!isValid) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

const strategy = new Strategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
