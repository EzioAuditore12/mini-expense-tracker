import { useQuery } from '@tanstack/react-query';

import { getExpenseSummaryApi } from '../../api/get-expense-summary.api';

export const USE_GET_EXPENSE_SUMMARY_QUERY_KEY = 'expense-summary';

export function useGetExpenseSummary() {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_SUMMARY_QUERY_KEY],
    queryFn: getExpenseSummaryApi,
  });
}
