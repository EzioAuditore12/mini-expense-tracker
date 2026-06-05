import { z } from 'zod';

import { budgetSchema } from '@/db/tables/budget.table';

export const getAllBudgetsResponseSchema = z.object({
  data: budgetSchema.array(),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type GetAllBudgetsResponse = z.infer<typeof getAllBudgetsResponseSchema>;
