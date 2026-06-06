import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';

import { MonthYearSelect } from '@/features/main/dashboard/components/month-year-select';

import { ExpensesChartCard } from '@/features/main/dashboard/components/chart-cards/expense';
import { DashboardHeader } from '@/features/main/dashboard/components/header';

import { DashboardStatsSection } from '@/features/main/dashboard/components/stats';
import { MonthlySpendingTrendCard } from '@/features/main/dashboard/components/chart-cards/monthly-spending-trends';
import { BudgetOverviewCard } from '@/features/main/dashboard/components/budget-section/overview-card';
import { AddBudgetFormDialog } from '@/features/main/dashboard/components/budget-section/form/create-dialog';
import { EditBudgetDialog } from '@/features/main/dashboard/components/budget-section/form/edit-dialog';

import { useBudgetMutations } from '@/features/main/dashboard/hooks/mutations';
import { useDashboardQueries } from '@/features/main/dashboard/hooks/queries';

import type { BudgetSummary } from '@/features/main/dashboard/schemas/budget/summary/response.schema';

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

      <BudgetAnalyticsSection queries={dashboardQueries} />
    </div>
  );
}

function ExpenseAnalyticsSection({
  queries,
}: {
  queries: ReturnType<typeof useDashboardQueries>;
}) {
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

function BudgetAnalyticsSection({
  queries,
}: {
  queries: ReturnType<typeof useDashboardQueries>;
}) {
  const [editingBudget, setEditingBudget] = useState<BudgetSummary | null>(null);

  const {
    budgetSummary,
    isBudgetLoading,
    isBudgetFetching,
  } = queries;

  const {
    createBudget,
    isCreatePending,
    editBudget,
    isEditPending,
    deleteBudget,
  } = useBudgetMutations();

  return (
    <>
      <BudgetOverviewCard
        data={budgetSummary}
        isLoading={isBudgetLoading}
        isFetching={isBudgetFetching}
        onEdit={(id) => {
          const budget = budgetSummary?.find((b) => b.id === id);

          if (budget) setEditingBudget(budget);
        }}
        onDelete={(id) => {
          if (confirm('Are you sure you want to delete this budget?')) {
            deleteBudget(id);
          }
        }}
      />

      <AddBudgetFormDialog handleSubmit={createBudget} isPending={isCreatePending} />

      <EditBudgetDialog
        budget={editingBudget}
        onClose={() => setEditingBudget(null)}
        isPending={isEditPending}
        onSubmit={editBudget}
      />
    </>
  );
}

