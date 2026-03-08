import { pool } from './pool.js';

export async function getMessages() {
  const { rows } = await pool.query(
    'SELECT messages.*, users.username FROM messages INNER JOIN users ON messages.user_id = users.id'
  );
  return rows;
}

export async function createMessage(data) {
  console.log('Message from controller:', data);
  return await pool.query('INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)', [
    data.title,
    data.content,
    data.user_id,
  ]);
}

export async function getMessage(messageId) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);
  return rows[0];
}
