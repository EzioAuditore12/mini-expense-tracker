import { DashboardStatsSection } from './stats';
import { ExpensesChartCard } from './chart-cards/expense';
import { MonthlySpendingTrendCard } from './chart-cards/monthly-spending-trends';
import { useDashboardQueries } from '../hooks/queries';

interface ExpenseAnalyticsSectionProps {
  queries: ReturnType<typeof useDashboardQueries>;
}

export function ExpenseAnalyticsSection({ queries }: ExpenseAnalyticsSectionProps) {
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
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
