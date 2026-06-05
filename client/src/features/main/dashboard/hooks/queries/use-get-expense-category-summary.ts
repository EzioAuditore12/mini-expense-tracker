import { useQuery } from '@tanstack/react-query';
import { getExpenseCategorySummaryApi } from '../../api/get-expense-category-summary.api';

export const USE_GET_EXPENSE_CATEGORY_SUMMARY_QUERY_KEY = 'expense-category-summary';

export function useGetExpenseCategorySummary() {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_CATEGORY_SUMMARY_QUERY_KEY],
    queryFn: getExpenseCategorySummaryApi,
  });
}
