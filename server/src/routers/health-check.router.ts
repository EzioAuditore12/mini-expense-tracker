import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Request, type Response, type Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/lib/open-api/open-api-response-builder';
import { ServiceResponse } from '@/utils/service-response';
import { TAGS, ROUTE_PATHS } from '@/lib/constants/routes';

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: 'get',
  path: ROUTE_PATHS.HEALTH_CHECK,
  description: 'Returns the current health status of the API server.',
  tags: [TAGS.HEALTH_CHECK],
  responses: createApiResponse(z.null(), 'Success'),
});

healthCheckRouter.get('/', (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success('Service is healthy', null);
  res.status(serviceResponse.statusCode).send(serviceResponse);
});
