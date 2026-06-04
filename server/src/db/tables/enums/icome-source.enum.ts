import { z } from 'zod';

export const incomeSourceEnum = [
  'SALARY',
  'FREELANCE',
  'INVESTMENT',
  'GIFT',
  'OTHER',
] as const;

export const incomeSourceEnumSchema = z.enum(incomeSourceEnum);

export type IncomeSource = z.infer<typeof incomeSourceEnumSchema>;
