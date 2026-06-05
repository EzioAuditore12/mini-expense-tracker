import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

import { healthCheckRegistry } from '@/routers/health-check.router';
import { authRegistry } from '@/routers/auth.router';
import { userRegistry } from '@/routers/user.router';
import { expenseRegistry } from '@/routers/expense.router';
import { budgetRegistry } from '@/routers/budget.router';

export type OpenAPIDocument = ReturnType<
  OpenApiGeneratorV3['generateDocument']
>;

export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    authRegistry,
    userRegistry,
    expenseRegistry,
    budgetRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Scalar API',
    },
  });
}
