import { useQuery } from '@tanstack/react-query';
import { getExpenseMonthlyTrendApi } from '../../api/get-expense-monthly-trend.api';

export const USE_GET_EXPENSE_MONTHLY_TREND = 'expense-monthly-trend';

export function useGetExpenseMonthlyTrend() {
  return useQuery({
    queryKey: [USE_GET_EXPENSE_MONTHLY_TREND],
    queryFn: getExpenseMonthlyTrendApi,
  });
}
