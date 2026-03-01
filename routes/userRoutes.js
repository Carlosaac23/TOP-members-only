import { Router } from 'express';
import {
  getHome,
  getRegister,
  postRegister,
  getUserController,
  loginPage,
  login,
  loginFailure,
  loginSuccess,
  protectedRoute,
  logout,
} from '../controllers/userController.js';
import { isAuth } from '../middleware/auth.js';

export const userRoutes = Router();

userRoutes.get('/', getHome);
userRoutes.route('/add').get(getRegister).post(postRegister);
userRoutes.route('/login').get(loginPage).post(login);
userRoutes.get('/login-failure', loginFailure);
userRoutes.get('/login-success', loginSuccess);
userRoutes.get('/protected-route', isAuth, protectedRoute);
userRoutes.get('/logout', logout);
userRoutes.get('/:userId', getUserController);
