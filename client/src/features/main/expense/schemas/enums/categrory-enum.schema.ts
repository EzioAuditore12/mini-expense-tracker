import { z } from 'zod';

export const categoryEnumSchema = z.enum([
  'FOOD',
  'TRANSPORT',
  'BILLS',
  'ENTERTAINMENT',
  'SHOPPING',
  'HEALTH',
  'EDUCATION',
  'TRAVEL',
  'OTHER',
]);

export type CategoryEnum = z.infer<typeof categoryEnumSchema>;
