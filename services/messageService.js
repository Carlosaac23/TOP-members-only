import { insertMessage, getMessage } from '../db/messageQueries.js';

export async function insertMessageService(data) {
  console.log('Message from service:', data);
  await insertMessage(data);
}

export async function getMessageService(messageId) {
  return await getMessage(messageId);
}
