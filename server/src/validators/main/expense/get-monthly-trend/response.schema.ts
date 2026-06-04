import { z } from 'zod';

export const getMonthlyTrendResponseSchema = z
  .object({
    month: z.string(),
    total: z.number(),
  })
  .array();

export type GetMonthlyTrendResponse = z.infer<
  typeof getMonthlyTrendResponseSchema
>;
