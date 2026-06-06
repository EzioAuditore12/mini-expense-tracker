import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { env } from '@/env';

// Configure pino: use pretty-print in dev, JSON in production
const logger = pino({
  level: env.isProduction ? 'info' : 'debug',
  transport: env.isProduction ? undefined : { target: 'pino-pretty' },
});

/** Map HTTP status codes to pino log levels (5xx=error, 4xx=warn, rest=info) */
const getLogLevel = (status: number) => {
  if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return 'error';
  if (status >= StatusCodes.BAD_REQUEST) return 'warn';
  return 'info';
};

/**
 * Injects a unique request ID (or reuses an existing X-Request-Id header)
 * so every log line for a request can be correlated.
 */
const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  const existingId = req.headers['x-request-id'] as string;
  const requestId = existingId || randomUUID();

  // Set for downstream use
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-Id', requestId);

  next();
};

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] as string,
  customLogLevel: (_req, res) => getLogLevel(res.statusCode),
  customSuccessMessage: (req) => `${req.method} ${req.url} completed`,
  customErrorMessage: (_req, res) =>
    `Request failed with status code: ${res.statusCode}`,
  // Only log response bodies in development
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      id: req.id,
    }),
  },
});

/**
 * Monkey-patches res.send in development to capture the response body
 * onto res.locals for debugging/logging purposes.
 */
const captureResponseBody = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!env.isProduction) {
    const originalSend = res.send;
    res.send = function (body) {
      res.locals.responseBody = body;
      return originalSend.call(this, body);
    };
  }
  next();
};

// Pipeline order: assign request ID → capture response body → log with pino
export default [addRequestId, captureResponseBody, httpLogger];
