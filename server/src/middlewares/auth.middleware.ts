import type { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from 'express-error-toolkit';

import { jwt } from '@/utils/jwt';

/**
 * Module augmentation: extends Express's Request type globally so that
 * `req.user` is available in all downstream handlers after auth verification.
 */
declare module 'express' {
  interface Request {
    user?: { id: string };
  }
}

/**
 * Extracts and verifies the JWT access token from the Authorization header.
 * On success, attaches the decoded user id to `req.user` for downstream use.
 * On failure, throws UnauthenticatedError which the error handler maps to 401.
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Missing or invalid Authorization header');

  const token = authHeader.split(' ')[1];
  const decoded = await jwt.parseAccessToken(token);

  if (!decoded) {
    throw new UnauthenticatedError('Invalid or expired token');
  }

  // Attach user id to request for use in controllers/services
  req.user = { id: decoded.sub };

  next();
}
