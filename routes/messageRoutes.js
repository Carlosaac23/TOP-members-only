import { Router } from 'express';
import {
  getMessagesController,
  createMessageController,
  getMessageController,
} from '../controllers/messageController.js';

export const messageRoutes = Router();

messageRoutes.get('/', getMessagesController);
messageRoutes.post('/add', createMessageController);
messageRoutes.get('/:messageId', getMessageController);
