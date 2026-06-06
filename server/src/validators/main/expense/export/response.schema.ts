import { z } from 'zod';

export const exportExpensesResponseSchema = z.unknown();

export type ExportExpensesResponse = z.infer<
  typeof exportExpensesResponseSchema
>;
