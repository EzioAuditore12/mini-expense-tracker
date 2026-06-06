import type { Request } from 'express';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

import { env } from '@/env';

/**
 * Global rate limiter applied to all routes.
 * Window = 15 minutes * COMMON_RATE_LIMIT_WINDOW_MS (in ms).
 * Uses the client's IP address as the rate-limit key.
 */
const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => ipKeyGenerator(req.ip as string),
});

export default rateLimiter;
