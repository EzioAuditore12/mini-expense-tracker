import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import validate from 'express-zod-safe';

import { authMiddleware } from '@/middlewares/auth.middleware';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { requestBody } from '@/lib/open-api/open-api-request-builder';
import { authHeaderSchema } from '@/lib/open-api/open-api-auth-header';
import { TAGS, ROUTE_PATHS } from '@/lib/constants/routes';

import { expenseController } from '@/controllers/expense.controller';

import { createExpenseSchema } from '@/validators/main/expense/create/request';
import { createExpenseResponseSchema } from '@/validators/main/expense/create/response';
import { updateExpenseSchema } from '@/validators/main/expense/update/request';
import { updateExpenseResponseSchema } from '@/validators/main/expense/update/response';
import { expenseParamSchema } from '@/validators/main/expense/param';
import { expenseSchema } from '@/db/tables/expense.table';
import { getAllExpensesSchema } from '@/validators/main/expense/get-all/request';
import { getExpenseSummaryResponseSchema } from '@/validators/main/expense/get-summary/response.schema';
import { getCategorySummaryResponseSchema } from '@/validators/main/expense/get-category-summary/response.schema';
import { getMonthlyTrendResponseSchema } from '@/validators/main/expense/get-monthly-trend/response.schema';
import { getAllExpensesResponseSchema } from '@/validators/main/expense/get-all/response';
import { expenseDeleteResponseSchema } from '@/validators/main/expense/delete/response';
import { expenseDeleteParamSchema } from '@/validators/main/expense/delete/request';
import { exportExpensesSchema } from '@/validators/main/expense/export/request.schema';
import { exportExpensesResponseSchema } from '@/validators/main/expense/export/response.schema';

export const expenseRegistry = new OpenAPIRegistry();
export const expenseRouter: Router = express.Router();

expenseRegistry.registerPath({
  method: 'post',
  path: ROUTE_PATHS.EXPENSE,
  description: 'Create a new expense entry for the authenticated user.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
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
  path: `${ROUTE_PATHS.EXPENSE}/summary`,
  description:
    'Get a spending summary (total, average, count) for the authenticated user.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
  },
  responses: createApiResponse(getExpenseSummaryResponseSchema, 'Success'),
});

expenseRouter.get(
  '/summary',
  authMiddleware,
  expenseController.getSummaryByUserId,
);

expenseRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.EXPENSE}/category-summary`,
  description:
    'Get expense totals grouped by category for the authenticated user.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
  },
  responses: createApiResponse(getCategorySummaryResponseSchema, 'Success'),
});

expenseRouter.get(
  '/category-summary',
  authMiddleware,
  expenseController.getCategorySummaryByUserId,
);

expenseRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.EXPENSE}/monthly-trend`,
  description:
    'Get month-over-month spending trends for the authenticated user.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
  },
  responses: createApiResponse(getMonthlyTrendResponseSchema, 'Success'),
});

expenseRouter.get(
  '/monthly-trend',
  authMiddleware,
  expenseController.getMonthlyTrendByUserId,
);

expenseRegistry.registerPath({
  method: 'get',
  path: ROUTE_PATHS.EXPENSE,
  description:
    'List all expenses for the authenticated user with optional filtering, sorting, and pagination.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
    query: getAllExpensesSchema,
  },
  responses: createApiResponse(getAllExpensesResponseSchema, 'Success'),
});

expenseRouter.get(
  '/',
  authMiddleware,
  //@ts-ignores
  validate({ query: getAllExpensesSchema }),
  expenseController.getAllByUserId,
);

expenseRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.EXPENSE}/export`,
  description: "Export the authenticated user's expenses as a CSV file.",
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
    query: exportExpensesSchema,
  },
  responses: createApiResponse(exportExpensesResponseSchema, 'Success'),
});

expenseRouter.get(
  '/export',
  authMiddleware,
  //@ts-ignores
  validate({ query: exportExpensesSchema }),
  expenseController.exportCsvByUserId,
);

expenseRegistry.registerPath({
  method: 'get',
  path: `${ROUTE_PATHS.EXPENSE}/{id}`,
  description: 'Retrieve a single expense by its unique ID.',
  tags: [TAGS.EXPENSE],
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
  method: 'patch',
  path: `${ROUTE_PATHS.EXPENSE}/{id}`,
  description:
    'Update an existing expense by its ID. Only the fields provided will be modified.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
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
  path: `${ROUTE_PATHS.EXPENSE}/{id}`,
  description: 'Permanently delete an expense by its ID.',
  tags: [TAGS.EXPENSE],
  request: {
    headers: authHeaderSchema,
    params: expenseDeleteParamSchema,
  },
  responses: createApiResponse(expenseDeleteResponseSchema, 'Success'),
});

expenseRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: expenseDeleteParamSchema }),
  expenseController.delete,
);
