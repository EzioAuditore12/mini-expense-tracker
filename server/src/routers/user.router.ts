import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';
import validate from 'express-zod-safe';

import { publicUserSchema } from '@/db/tables/user.table';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { authHeaderSchema } from '@/lib/open-api/open-api-auth-header';
import { TAGS, ROUTE_PATHS } from '@/lib/constants/routes';

import { userController } from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.USER}/profile`,
  description: 'Retrieve the authenticated user\'s profile information.',
  tags: [TAGS.USER],
  request: {
    headers: authHeaderSchema,
  },
  responses: createApiResponse(publicUserSchema, 'Success'),
});

userRouter.get('/profile', authMiddleware, userController.getProfile);

userRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.USER}/{id}`,
  description: 'Retrieve a user\'s public profile by their unique ID.',
  tags: [TAGS.USER],
  request: { params: z.object({ id: z.uuid() }) },
  responses: createApiResponse(publicUserSchema, 'Success'),
});

userRouter.get(
  '/:id',
  validate({ params: { id: z.uuid() } }),
  userController.get,
);
