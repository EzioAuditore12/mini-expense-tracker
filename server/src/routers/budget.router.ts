import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';

import { authMiddleware } from '@/middlewares/auth.middleware';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { requestBody } from '@/lib/open-api/open-api-request-builder';
import { authHeaderSchema } from '@/lib/open-api/open-api-auth-header';
import { TAGS, ROUTE_PATHS } from '@/lib/constants/routes';

import { budgetController } from '@/controllers/budget.controller';

import { createBudgetSchema } from '@/validators/main/budget/create/request';
import { createBudgetResponseSchema } from '@/validators/main/budget/create/response';
import { updateBudgetSchema } from '@/validators/main/budget/update/request';
import { updateBudgetResponseSchema } from '@/validators/main/budget/update/response';
import { budgetParamSchema } from '@/validators/main/budget/param';
import { budgetSchema } from '@/db/tables/budget.table';
import { getAllBudgetsSchema } from '@/validators/main/budget/get-all/request';
import { getAllBudgetsResponseSchema } from '@/validators/main/budget/get-all/response';
import { budgetDeleteResponseSchema } from '@/validators/main/budget/delete/response';
import { budgetDeleteParamSchema } from '@/validators/main/budget/delete/request';
import { budgetStatusQuerySchema } from '@/validators/main/budget/status/request.schema';
import { budgetStatusResponseSchema } from '@/validators/main/budget/status/response.schema';

export const budgetRegistry = new OpenAPIRegistry();
export const budgetRouter: Router = express.Router();

budgetRegistry.registerPath({
  method: 'post',
  path: ROUTE_PATHS.BUDGET,
  description: 'Create a new monthly budget for a specific category.',
  tags: [TAGS.BUDGET],
  request: {
    headers: authHeaderSchema,
    body: requestBody(createBudgetSchema),
  },
  responses: createApiResponse(createBudgetResponseSchema, 'Success'),
});

budgetRouter.post(
  '/',
  authMiddleware,
  validate({ body: createBudgetSchema }),
  budgetController.create,
);

budgetRegistry.registerPath({
  method: 'get',
  path: ROUTE_PATHS.BUDGET,
  description: 'List all budgets for the authenticated user with optional filtering and pagination.',
  tags: [TAGS.BUDGET],
  request: {
    headers: authHeaderSchema,
    query: getAllBudgetsSchema,
  },
  responses: createApiResponse(getAllBudgetsResponseSchema, 'Success'),
});

budgetRouter.get(
  '/',
  authMiddleware,
  //@ts-ignore
  validate({ query: getAllBudgetsSchema }),
  budgetController.getAllByUserId,
);

budgetRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.BUDGET}/summary`,
  description: 'Get the current spending status of each budget (spent vs. limit) for a given period.',
  tags: [TAGS.BUDGET],
  request: {
    headers: authHeaderSchema,
    query: budgetStatusQuerySchema,
  },
  responses: createApiResponse(budgetStatusResponseSchema, 'Success'),
});

budgetRouter.get(
  '/summary',
  authMiddleware,
  //@ts-ignore
  validate({ query: budgetStatusQuerySchema }),
  budgetController.getBudgetStatusByUserId,
);

budgetRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.BUDGET}/{id}`,
  description: 'Retrieve a single budget by its unique ID.',
  tags: [TAGS.BUDGET],
  request: {
    params: budgetParamSchema,
  },
  responses: createApiResponse(budgetSchema, 'Success'),
});

budgetRouter.get(
  '/:id',
  validate({ params: budgetParamSchema }),
  budgetController.get,
);

budgetRegistry.registerPath({
  method: 'patch',
  path: `${ROUTE_PATHS.BUDGET}/{id}`,
  description: 'Update an existing budget by its ID. Only the fields provided will be modified.',
  tags: [TAGS.BUDGET],
  request: {
    headers: authHeaderSchema,
    params: budgetParamSchema,
    body: requestBody(updateBudgetSchema),
  },
  responses: createApiResponse(updateBudgetResponseSchema, 'Success'),
});

budgetRouter.patch(
  '/:id',
  authMiddleware,
  validate({ body: updateBudgetSchema, params: budgetParamSchema }),
  budgetController.update,
);

budgetRegistry.registerPath({
  method: 'delete',
  path: `${ROUTE_PATHS.BUDGET}/{id}`,
  description: 'Permanently delete a budget by its ID.',
  tags: [TAGS.BUDGET],
  request: {
    headers: authHeaderSchema,
    params: budgetDeleteParamSchema,
  },
  responses: createApiResponse(budgetDeleteResponseSchema, 'Success'),
});

budgetRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: budgetDeleteParamSchema }),
  budgetController.delete,
);
