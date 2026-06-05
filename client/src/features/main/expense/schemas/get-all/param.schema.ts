import { z } from 'zod';

import { paginationSchema } from '@/features/common/schemas/pagination.schema';

import { categoryEnumSchema } from '../enums/categrory-enum.schema';

export const getAllExpensesParamSchema = paginationSchema.extend({
  category: categoryEnumSchema.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type GetAllExpensesParam = z.infer<typeof getAllExpensesParamSchema>;
