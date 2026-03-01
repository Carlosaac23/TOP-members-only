import { insertMessageService, getMessageService } from '../services/messageService.js';
import { getMessages } from '../db/messageQueries.js';
import {
  messageRowSchema,
  createMessageInputSchema,
  messageListSchema,
} from '../schemas/messageSchema.js';

export async function getMessagesController(req, res) {
  const messages = await getMessages();
  const parsedMessages = messageListSchema.safeParse(messages);

  if (!parsedMessages.success) {
    return res.status(400).json({ errors: parsedMessages.error.issues });
  }

  res.status(201).json(parsedMessages.data);
}

export async function createMessageController(req, res) {
  console.log('message from controller:', req.body);
  const parsedMessage = createMessageInputSchema.safeParse(req.body);

  if (!parsedMessage.success) {
    return res.status(400).json({ errors: parsedMessage.error.issues });
  }

  await insertMessageService(parsedMessage.data);
  res.status(201).json(parsedMessage.data);
}

export async function getMessageController(req, res) {
  const { messageId } = req.params;
  const message = await getMessageService(messageId);
  const parsedMessage = messageRowSchema.safeParse(message);

  if (!parsedMessage.success) {
    return res.status(400).json({ errors: parsedMessage.error.issues });
  }

  console.log('message:', message);
  res.status(201).json(parsedMessage.data);
}
