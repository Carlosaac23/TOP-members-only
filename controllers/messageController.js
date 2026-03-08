// import { insertMessageService, getMessageService } from '../services/messageService.js';
import { createMessage } from '../db/messageQueries.js';
// import { getMessages } from '../db/messageQueries.js';
import { messageRowSchema, createMessageInputSchema } from '../schemas/messageSchema.js';

export async function createMessageFormController(req, res) {
  res.render('forms/createMessageForm');
}

export async function createMessageController(req, res) {
  console.log('message from controller:', req.body);
  const {
    user: { id: userId },
  } = req;

  const newMessage = {
    title: req.body.title,
    content: req.body.content,
    user_id: userId,
  };

  const parsedMessage = createMessageInputSchema.safeParse(newMessage);

  if (!parsedMessage.success) {
    return res.status(400).json({ errors: parsedMessage.error.issues });
  }

  await createMessage(parsedMessage.data);
  res.redirect('/messages');
}

// export async function getMessageController(req, res) {
//   const { messageId } = req.params;
//   const message = await getMessageService(messageId);
//   const parsedMessage = messageRowSchema.safeParse(message);

//   if (!parsedMessage.success) {
//     return res.status(400).json({ errors: parsedMessage.error.issues });
//   }

//   console.log('message:', message);
//   res.status(201).json(parsedMessage.data);
// }
