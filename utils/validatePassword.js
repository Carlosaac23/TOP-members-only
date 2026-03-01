import bcryp from 'bcrypt';

export async function generateHashPassword(password) {
  return await bcryp.hash(password, 12);
}

export async function validateHashedPassword(password, hashedPassword) {
  return await bcryp.compare(password, hashedPassword);
}
