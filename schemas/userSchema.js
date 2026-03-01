import { z } from 'zod';

export const userRowSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  username: z.string(),
  password_hash: z.string(),
  is_member: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createUserInputSchema = userRowSchema.omit({
  id: true,
  is_member: true,
  created_at: true,
  updated_at: true,
});

export const userListSchema = z.array(userRowSchema);
