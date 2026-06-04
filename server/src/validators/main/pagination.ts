import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

export const paginationSchema = z.object({
  cursor: z.string().optional(),
  pageSize: z.coerce.number().min(1).default(10),
  search: z.string().optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;

export type PaginationRequest = ValidatedRequest<{
  query: typeof paginationSchema;
}>;
