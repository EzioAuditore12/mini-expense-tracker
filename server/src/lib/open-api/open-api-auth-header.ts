import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

import { env } from '@/env';

extendZodWithOpenApi(z);

/**
 * Shared Zod schema for the Authorization header.
 * Used by all routes that require authMiddleware so the OpenAPI docs
 * show the header pre-filled with the test access token.
 */
export const authHeaderSchema = z.object({
  Authorization: z
    .string()
    .describe(
      'Bearer JWT access token (pre-filled with a test token for convenience)',
    )
    .openapi({ example: `Bearer ${env.TEST_ACESS_TOKEN}` }),
});
