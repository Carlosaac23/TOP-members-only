import { Router } from 'express';

import {
  createMessageFormController,
  createMessageController,
  // getMessageController,
} from '../controllers/messageController.js';
import isAuth from '../middleware/auth.js';

export const messageRoutes = Router();

messageRoutes.get('/', isAuth, createMessageFormController);
messageRoutes.post('/', isAuth, createMessageController);
// messageRoutes.get('/:messageId', getMessageController);
