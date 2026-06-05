import { createFileRoute } from '@tanstack/react-router';

import { ExpensesChartCard } from '@/features/main/dashboard/components/chart-cards/expense';
import { DashboardHeader } from '@/features/main/dashboard/components/header';

import { useGetExpenseCategorySummary } from '@/features/main/dashboard/hooks/queries/use-get-expense-category-summary';
import { useGetExpenseMonthlyTrend } from '@/features/main/dashboard/hooks/queries/use-get-expense-monthly-trend';
import { useGetExpenseSummary } from '@/features/main/dashboard/hooks/queries/use-get-expense-summary';
import { DashboardStatsSection } from '@/features/main/dashboard/components/stats';
import { MonthlySpendingTrendCard } from '@/features/main/dashboard/components/chart-cards/monthly-spending-trends';
import { useGetBudgetSummary } from '@/features/main/dashboard/hooks/queries/use-get-budget-summary';
import { BudgetOverview } from '@/features/main/dashboard/components/budget-overview-card';

export const Route = createFileRoute('/(main)/(dashboard)/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetExpenseCategorySummary();
  const { data: monthlyTrends } = useGetExpenseMonthlyTrend();
  const { data: expenseSummary } = useGetExpenseSummary();

  const { data: budgetSummary } = useGetBudgetSummary({
    month: 6,
    year: 2026,
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <DashboardStatsSection data={expenseSummary!} className="sm:grid-cols-2 xl:grid-cols-4" />

      <section className="grid gap-4 lg:grid-cols-2">
        <ExpensesChartCard data={data} />

        <MonthlySpendingTrendCard data={monthlyTrends} />
      </section>

      <BudgetOverview data={budgetSummary} />
    </div>
  );
}
