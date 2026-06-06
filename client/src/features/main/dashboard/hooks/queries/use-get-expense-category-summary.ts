import { useQuery } from '@tanstack/react-query';
import { getExpenseCategorySummaryApi } from '../../api/expense/category-summary.api';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const USE_GET_EXPENSE_CATEGORY_SUMMARY_QUERY_KEY = 'expense-category-summary';

export function useGetExpenseCategorySummary(query: BudgetSummaryParam) {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_CATEGORY_SUMMARY_QUERY_KEY, query.month, query.year],
    queryFn: () => getExpenseCategorySummaryApi(query),
  });
}
