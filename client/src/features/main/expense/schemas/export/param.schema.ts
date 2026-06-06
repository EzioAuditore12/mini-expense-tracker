import { z } from 'zod';

import { paginationSchema } from '@/features/common/schemas/pagination.schema';

import { categoryEnumSchema } from '../enums/categrory-enum.schema';

export const exportExpensesParamSchema = paginationSchema
  .omit({ page: true, pageSize: true })
  .extend({
    category: categoryEnumSchema.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  });

export type ExportExpensesParam = z.infer<typeof exportExpensesParamSchema>;
