import { z } from 'zod';

export const getMonthlyTrendResponseSchema = z
  .object({
    month: z.number().min(1).max(12),
    year: z.number(),
    total: z.number(),
  })
  .array();

export type GetMonthlyTrendResponse = z.infer<
  typeof getMonthlyTrendResponseSchema
>;
