import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';
import validate from 'express-zod-safe';

import { publicUserSchema } from '@/db/tables/user.table';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';

import { userController } from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.registerPath({
  method: 'get',
  path: '/user/profile',
  tags: ['User'],
  responses: createApiResponse(publicUserSchema, 'Success'),
});

userRouter.get('/profile', authMiddleware, userController.getProfile);

userRegistry.registerPath({
  method: 'get',
  path: '/user/{id}',
  tags: ['User'],
  request: { params: z.object({ id: z.uuid() }) },
  responses: createApiResponse(publicUserSchema, 'Success'),
});

userRouter.get(
  '/:id',
  validate({ params: { id: z.uuid() } }),
  userController.get,
);
