import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';

import { authMiddleware } from '@/middlewares/auth.middleware';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { requestBody } from '@/lib/open-api/open-api-request-builder';

import { expenseController } from '@/controllers/expense.controller';

import { createExpenseSchema } from '@/validators/main/expense/create/request';
import { createExpenseResponseSchema } from '@/validators/main/expense/create/response';
import { updateExpenseSchema } from '@/validators/main/expense/update/request';
import { updateExpenseResponseSchema } from '@/validators/main/expense/update/response';
import { expenseParamSchema } from '@/validators/main/expense/param';
import { expenseSchema } from '@/db/tables/expense.table';
import { paginationSchema } from '@/validators/main/pagination';

export const expenseRegistry = new OpenAPIRegistry();
export const expenseRouter: Router = express.Router();

expenseRegistry.registerPath({
  method: 'post',
  path: '/expense',
  tags: ['Expense'],
  request: {
    body: requestBody(createExpenseSchema),
  },
  responses: createApiResponse(createExpenseResponseSchema, 'Success'),
});

expenseRouter.post(
  '/',
  authMiddleware,
  validate({ body: createExpenseSchema }),
  expenseController.create,
);

expenseRegistry.registerPath({
  method: 'get',
  path: '/expense/{id}',
  tags: ['Expense'],
  request: {
    params: expenseParamSchema,
  },
  responses: createApiResponse(expenseSchema, 'Success'),
});

expenseRouter.get(
  '/:id',
  validate({ params: expenseParamSchema }),
  expenseController.get,
);

expenseRegistry.registerPath({
  method: 'get',
  path: '/expense',
  tags: ['Expense'],
  request: {
    query: paginationSchema,
  },
  responses: createApiResponse(expenseSchema.array(), 'Success'),
});

expenseRouter.get(
  '/',
  authMiddleware,
  //@ts-ignores
  validate({ query: paginationSchema }),
  expenseController.getAllByUserId,
);

expenseRegistry.registerPath({
  method: 'patch',
  path: '/expense/{id}',
  tags: ['Expense'],
  request: {
    params: expenseParamSchema,
    body: requestBody(updateExpenseSchema),
  },
  responses: createApiResponse(updateExpenseResponseSchema, 'Success'),
});

expenseRouter.patch(
  '/:id',
  authMiddleware,
  validate({ body: updateExpenseSchema, params: expenseParamSchema }),
  expenseController.update,
);

expenseRegistry.registerPath({
  method: 'delete',
  path: '/expense/{id}',
  tags: ['Expense'],
  request: {
    params: expenseParamSchema,
  },
  responses: createApiResponse(updateExpenseResponseSchema, 'Success'),
});

expenseRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: expenseParamSchema }),
  expenseController.delete,
);
