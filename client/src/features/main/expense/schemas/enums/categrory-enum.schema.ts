import { z } from 'zod';

export const categoryEnum = [
  'FOOD',
  'TRANSPORT',
  'BILLS',
  'ENTERTAINMENT',
  'SHOPPING',
  'HEALTH',
  'EDUCATION',
  'TRAVEL',
  'OTHER',
] as const;

export const categoryEnumSchema = z.enum(categoryEnum);

export type CategoryEnum = z.infer<typeof categoryEnumSchema>;
