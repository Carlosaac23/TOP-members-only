import { z } from 'zod';

export const messageRowSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  user_id: z.uuid(),
  created_at: z.date(),
});

export const createMessageInputSchema = messageRowSchema.omit({
  id: true,
  created_at: true,
});

export const messageListSchema = z.array(messageRowSchema);
