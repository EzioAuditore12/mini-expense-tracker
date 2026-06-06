import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { paginationSchema } from '../../pagination';
import { categoryEnumSchema } from '@/db/tables/enums/category.enum';

export const exportExpensesSchema = paginationSchema
  .omit({ page: true, pageSize: true })
  .extend({
    category: categoryEnumSchema.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  });

export type ExportExpenses = z.infer<typeof exportExpensesSchema>;

export type ExportExpensesRequest = ValidatedRequest<{
  query: typeof exportExpensesSchema;
}>;
