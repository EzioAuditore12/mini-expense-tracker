import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';

import { MonthYearSelect } from '@/features/main/dashboard/components/month-year-select';

import { ExpensesChartCard } from '@/features/main/dashboard/components/chart-cards/expense';
import { DashboardHeader } from '@/features/main/dashboard/components/header';

import { DashboardStatsSection } from '@/features/main/dashboard/components/stats';
import { MonthlySpendingTrendCard } from '@/features/main/dashboard/components/chart-cards/monthly-spending-trends';
import { BudgetAnalyticsSection } from '@/features/main/dashboard/components/budget-section/budget-analytics-section';
import { useDashboardQueries } from '@/features/main/dashboard/hooks/queries';

export const Route = createFileRoute('/(main)/(dashboard)/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [month, setMonth] = useState<number>(() => getMonth(new Date()) + 1);
  const [year, setYear] = useState<number>(() => getYear(new Date()));

  const dashboardQueries = useDashboardQueries({ month, year });

  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </DashboardHeader>

      <ExpenseAnalyticsSection queries={dashboardQueries} />

      <BudgetAnalyticsSection month={month} year={year} queries={dashboardQueries} />
    </div>
  );
}

function ExpenseAnalyticsSection({ queries }: { queries: ReturnType<typeof useDashboardQueries> }) {
  const {
    categorySummary,
    isCategoryLoading,
    isCategoryFetching,
    monthlyTrends,
    isTrendsLoading,
    isTrendsFetching,
    expenseSummary,
    isSummaryLoading,
    isSummaryFetching,
  } = queries;

  return (
    <>
      <DashboardStatsSection
        data={expenseSummary}
        isLoading={isSummaryLoading}
        isFetching={isSummaryFetching}
        className="sm:grid-cols-2 xl:grid-cols-4"
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <ExpensesChartCard
          data={categorySummary}
          isLoading={isCategoryLoading}
          isFetching={isCategoryFetching}
        />

        <MonthlySpendingTrendCard
          data={monthlyTrends}
          isLoading={isTrendsLoading}
          isFetching={isTrendsFetching}
        />
      </section>
    </>
  );
}
