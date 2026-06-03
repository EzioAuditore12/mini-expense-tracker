import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { requestBody } from '@/lib/open-api/open-api-request-builder';

import { authController } from '@/controllers/auth.controller';

import { registerRequestSchema } from '@/validators/auth/register/request';
import { registerResponseSchema } from '@/validators/auth/register/response';
import { loginRequestSchema } from '@/validators/auth/login/request';
import { loginResponseSchema } from '@/validators/auth/login/response';
import { refreshRequestSchema } from '@/validators/auth/refresh/request.schema';
import { refreshResponseSchema } from '@/validators/auth/refresh/response.schema';

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  request: {
    body: requestBody(registerRequestSchema),
  },
  responses: createApiResponse(registerResponseSchema, 'Success'),
});

authRouter.post(
  '/register',
  validate({ body: registerRequestSchema }),
  authController.register,
);

authRegistry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: requestBody(loginRequestSchema),
  },
  responses: createApiResponse(loginResponseSchema, 'Success'),
});

authRouter.post(
  '/login',
  validate({ body: loginRequestSchema }),
  authController.login,
);

authRegistry.registerPath({
  method: 'post',
  path: '/auth/refresh',
  tags: ['Auth'],
  request: {
    body: requestBody(refreshRequestSchema),
  },
  responses: createApiResponse(refreshResponseSchema, 'Success'),
});

authRouter.post(
  '/refresh',
  validate({ body: refreshRequestSchema }),
  authController.refresh,
);
