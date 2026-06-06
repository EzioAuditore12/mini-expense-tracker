/**
 * Centralized route path and OpenAPI tag constants.
 * Use these instead of hardcoded strings across routers and app.ts.
 */

export const ROUTE_PATHS = {
  HEALTH_CHECK: '/health-check',
  AUTH: '/auth',
  USER: '/user',
  EXPENSE: '/expense',
  BUDGET: '/budget',
} as const;

export const TAGS = {
  HEALTH_CHECK: 'Health Check',
  AUTH: 'Auth',
  USER: 'User',
  EXPENSE: 'Expense',
  BUDGET: 'Budget',
} as const;
