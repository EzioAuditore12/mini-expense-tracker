import { useQuery } from '@tanstack/react-query';

import { budgetSummaryApi } from '../../api/budget/summary.api';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const USE_GET_BUDGET_QUERY_KEY = 'budget-summary';

export function useGetBudgetSummary(query: BudgetSummaryParam) {
  return useQuery({
    queryKey: [USE_GET_BUDGET_QUERY_KEY, query.month, query.year],
    queryFn: () => budgetSummaryApi(query),
  });
}
