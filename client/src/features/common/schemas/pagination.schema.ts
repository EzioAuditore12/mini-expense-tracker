import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).default(10),
  search: z.string().optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;
