import type { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// Catch-all handler: any request that doesn't match a registered route gets a 404
const unexpectedRequest: RequestHandler = (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('Not Found');
};

// Stash the error on res.locals so pino-http's request logger can include it
const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

/**
 * Returns a tuple: [404 catch-all, error logger].
 * Must be registered AFTER all routes — Express matches middleware in order.
 */
export default (): [RequestHandler, ErrorRequestHandler] => [
  unexpectedRequest,
  addErrorToRequestLog,
];
