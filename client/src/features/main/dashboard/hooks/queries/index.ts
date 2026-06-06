import { useGetBudgetSummary } from './use-get-budget-summary';
import { useGetExpenseCategorySummary } from './use-get-expense-category-summary';
import { useGetExpenseMonthlyTrend } from './use-get-expense-monthly-trend';
import { useGetExpenseSummary } from './use-get-expense-summary';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export * from './use-get-budget-summary';
export * from './use-get-expense-category-summary';
export * from './use-get-expense-monthly-trend';
export * from './use-get-expense-summary';

export function useDashboardQueries(budgetParams: BudgetSummaryParam) {
  const budgetSummary = useGetBudgetSummary(budgetParams);
  const expenseCategorySummary = useGetExpenseCategorySummary(budgetParams);
  const expenseMonthlyTrend = useGetExpenseMonthlyTrend({ year: budgetParams.year });
  const expenseSummary = useGetExpenseSummary(budgetParams);

  return {
    // Budget Summary
    budgetSummary: budgetSummary.data,
    isBudgetLoading: budgetSummary.isLoading,
    isBudgetFetching: budgetSummary.isFetching,

    // Expense Category Summary
    categorySummary: expenseCategorySummary.data,
    isCategoryLoading: expenseCategorySummary.isLoading,
    isCategoryFetching: expenseCategorySummary.isFetching,

    // Expense Monthly Trend
    monthlyTrends: expenseMonthlyTrend.data,
    isTrendsLoading: expenseMonthlyTrend.isLoading,
    isTrendsFetching: expenseMonthlyTrend.isFetching,

    // Expense Summary
    expenseSummary: expenseSummary.data,
    isSummaryLoading: expenseSummary.isLoading,
    isSummaryFetching: expenseSummary.isFetching,
  };
}
