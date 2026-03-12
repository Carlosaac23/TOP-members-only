import { z } from 'zod';

export const userRowSchema = z.object({
  id: z.uuid(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().optional(),
  email: z.email('Enter a valid email address').min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password_hash: z.string().min(1, 'Password is required'),
  is_member: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createUserInputSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().optional(),
    email: z.email('Enter a valid email address').min(1, 'Email is required'),
    username: z.string().min(1, 'Username is required'),
    password_hash: z.string().min(1, 'Password is required'),
    confirm_password: z.string().min(1, 'Password is required'),
  })
  .refine(data => data.password_hash === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const userListSchema = z.array(userRowSchema);
