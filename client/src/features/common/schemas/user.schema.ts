import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().max(100),
  email: z.string().max(240),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type User = z.infer<typeof userSchema>;
