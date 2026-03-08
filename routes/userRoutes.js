import { Router } from 'express';

import {
  userHomeFeedController,
  userProfileController,
  // protectedRoute,
  userMembershipController,
  userActivateMembershipController,
} from '../controllers/userController.js';
import isAuth from '../middleware/auth.js';

export const userRoutes = Router();

userRoutes.get('/', isAuth, userHomeFeedController);
userRoutes.get('/profile', isAuth, userProfileController);
userRoutes
  .route('/membership')
  .get(isAuth, userMembershipController)
  .post(isAuth, userActivateMembershipController);
// userRoutes.route('/add').get(getRegister).post(postRegister);
// userRoutes.route('/login').get(loginPage).post(login);
// userRoutes.get('/login-failure', loginFailure);
// userRoutes.get('/login-success', loginSuccess);
// userRoutes.get('/protected-route', isAuth, protectedRoute);
// userRoutes.get('/logout', logout);
