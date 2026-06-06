import { useQuery } from '@tanstack/react-query';
import { getExpenseMonthlyTrendApi } from '../../api/expense/monthly-trend.api';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const USE_GET_EXPENSE_MONTHLY_TREND = 'expense-monthly-trend';

export function useGetExpenseMonthlyTrend(query: Pick<BudgetSummaryParam, 'year'>) {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_MONTHLY_TREND, query.year],
    queryFn: () => getExpenseMonthlyTrendApi(query),
  });
}
