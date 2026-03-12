import { insertUser } from '../db/userQueries.js';
import { generateHashedPassword } from '../helpers/validatePassword.js';

export async function createUser(data) {
  const hashedPassword = await generateHashedPassword(data.password_hash, 12);

  return await insertUser({
    ...data,
    password_hash: hashedPassword,
  });
}
