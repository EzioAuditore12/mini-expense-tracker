import cors from 'cors';
import express, { type Express } from 'express';

import { openAPIRouter } from '@/lib/open-api/open-api-router';

import errorHandler from '@/middlewares/error-handler';
import rateLimiter from '@/middlewares/rate-limiter';
import requestLogger from '@/middlewares/request-logger';
import helmet from '@/middlewares/helmet';

import { env } from '@/env';

import { healthCheckRouter } from '@/routers/health-check.router';
import { authRouter } from './routers/auth.router';
import { userRouter } from './routers/user.router';
import { expenseRouter } from './routers/expense.router';
import { budgetRouter } from './routers/budget.router';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet);
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/budget', budgetRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
