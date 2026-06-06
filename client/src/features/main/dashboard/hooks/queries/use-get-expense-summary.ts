import { useQuery } from '@tanstack/react-query';

import { getExpenseSummaryApi } from '../../api/expense/summary.api';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const USE_GET_EXPENSE_SUMMARY_QUERY_KEY = 'expense-summary';

export function useGetExpenseSummary(query: BudgetSummaryParam) {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_SUMMARY_QUERY_KEY, query.month, query.year],
    queryFn: () => getExpenseSummaryApi(query),
  });
}
