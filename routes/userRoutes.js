import { Router } from 'express';

import {
  userHomeFeedController,
  userProfileController,
  userMembershipController,
  userActivateMembershipController,
  userMembersController,
} from '../controllers/userController.js';
import isAuth from '../middleware/auth.js';

export const userRoutes = Router();

userRoutes.get('/', isAuth, userHomeFeedController);
userRoutes.get('/profile', isAuth, userProfileController);
userRoutes
  .route('/membership')
  .get(isAuth, userMembershipController)
  .post(isAuth, userActivateMembershipController);
userRoutes.get('/members', isAuth, userMembersController);
