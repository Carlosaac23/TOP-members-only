import { Strategy } from 'passport-local';
import passport from 'passport';
import { pool } from '../db/pool.js';
import { validateHashedPassword } from '../utils/validatePassword.js';

export async function verifyCallback(username, password, done) {
  await pool
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then(async user => {
      if (!user.rows.length) {
        return done(null, false);
      }

      console.log('User from verifyCallback fn:', user);

      const isValid = await validateHashedPassword(password, user.rows[0].password_hash);

      if (isValid) {
        return done(null, user.rows[0]);
      } else {
        return done(null, false);
      }
    })
    .catch(error => {
      return done(error);
    });
}

const strategy = new Strategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  await pool
    .query('SELECT * FROM users WHERE id = $1', [userId])
    .then(user => done(null, user.rows[0]))
    .catch(error => done(error));
});
