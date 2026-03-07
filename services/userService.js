import { insertUser, getUserById } from '../db/userQueries.js';
import { generateHashedPassword } from '../helpers/validatePassword.js';

export async function createUser(data) {
  console.log('Data in service:', data);
  const hashedPassword = await generateHashedPassword(data.password_hash, 12);

  return await insertUser({
    ...data,
    password_hash: hashedPassword,
  });
}

export async function getUser(userId) {
  const user = await getUserById(userId);
  const userPassword = user.password_hash;
  bcrypt.compare('estaeslamejorpassword', userPassword, (error, result) => {
    if (error) {
      console.error('Error comparing passwords');
    }

    if (result) {
      console.log('Passwords match! User authenticated.');
    } else {
      console.log('Passwords do not match! Authentication failed.');
    }
  });
  return user;
}
