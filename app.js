import expres from 'express';
import { userRoutes } from './routes/userRoutes.js';
import { messageRoutes } from './routes/messageRoutes.js';
import './config/passport.js';
import session from 'express-session';
import { pool } from './db/pool.js';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';

const app = expres();
const PORT = 8000;

const PgSession = connectPgSimple(session);
const sessionStore = new PgSession({
  pool,
  tableName: 'session',
});

app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

const ONE_DAY = 1000 * 60 * 60 * 24;

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: ONE_DAY },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.listen(PORT, '0.0.0.0', error => {
  if (error) throw new Error(error);
  console.log(`App working in http://localhost:${PORT}`);
});
