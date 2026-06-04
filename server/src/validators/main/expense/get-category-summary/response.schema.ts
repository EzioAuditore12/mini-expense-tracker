import { z } from 'zod';

import { categoryEnumSchema } from '@/db/tables/enums/category.enum';

export const getCategorySummaryResponseSchema = z
  .object({
    category: categoryEnumSchema,
    total: z.number(),
  })
  .array();

export type GetCategorySummaryResponse = z.infer<
  typeof getCategorySummaryResponseSchema
>;
