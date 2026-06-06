import { env } from './env';
import { app } from './app';

import { logger } from '@/utils/logger';

// Start the HTTP server and log the running URL + Swagger docs URL
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  logger.info(`Rest Api Docs on port http://${HOST}:${PORT}/docs`);
});

/**
 * Graceful shutdown handler.
 * Stops accepting new connections, waits for in-flight requests to drain,
 * then exits. The 10s timeout is a safety net — if draining hangs, we
 * force-exit with code 1 so the process manager can restart us.
 * `.unref()` prevents the timer itself from keeping the event loop alive.
 */
const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
