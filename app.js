import connectPgSimple from 'connect-pg-simple';
import expres from 'express';
import session from 'express-session';
import passport from 'passport';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import './config/passport.js';
import { pool } from './db/pool.js';
import { indexRoutes } from './routes/indexRoutes.js';
import { messageRoutes } from './routes/messageRoutes.js';
import { userRoutes } from './routes/userRoutes.js';

const app = expres();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

const PgSession = connectPgSimple(session);
const sessionStore = new PgSession({
  pool,
  tableName: 'session',
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expres.static(assetsPath));
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

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

function startServer() {
  try {
    app.listen(PORT, '0.0.0.0', error => {
      if (error) {
        console.error('Failed to start server:', error);
        throw error;
      }
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
}

startServer();
