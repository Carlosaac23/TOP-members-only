import { Router } from 'express';

import {
  loginFormController,
  loginController,
  registerFormController,
  registerController,
  logoutController,
} from '../controllers/authController.js';

export const authRoutes = Router();

authRoutes.route('/register').get(registerFormController).post(registerController);
authRoutes.route('/login').get(loginFormController).post(loginController);
authRoutes.get('/logout', logoutController);
