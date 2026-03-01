import { pool } from './pool.js';

export async function getMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

export async function insertMessage(data) {
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
