import { z } from 'zod';

import { categoryEnumSchema } from './enums/categrory-enum.schema';

export const expenseSchema = z.object({
  id: z.base64(),
  userId: z.uuid(),
  amount: z.number().positive(),
  category: categoryEnumSchema,
  note: z.string().nullable(),
  expenseDate: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Expense = z.infer<typeof expenseSchema>;
