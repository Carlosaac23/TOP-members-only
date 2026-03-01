import { pool } from './pool.js';

export async function getUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

export async function insertUser(data) {
  return await pool.query(
    'INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [data.first_name, data.last_name, data.email, data.username, data.password_hash]
  );
}

export async function getUserById(userId) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return rows[0];
}
