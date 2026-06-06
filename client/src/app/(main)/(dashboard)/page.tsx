import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { ExpensesChartCard } from '@/features/main/dashboard/components/chart-cards/expense';
import { ExpensesChartCardSkeleton } from '@/features/main/dashboard/components/chart-cards/expense-skeleton';
import { DashboardHeader } from '@/features/main/dashboard/components/header';

import { useGetExpenseCategorySummary } from '@/features/main/dashboard/hooks/queries/use-get-expense-category-summary';
import { useGetExpenseMonthlyTrend } from '@/features/main/dashboard/hooks/queries/use-get-expense-monthly-trend';
import { useGetExpenseSummary } from '@/features/main/dashboard/hooks/queries/use-get-expense-summary';
import {
  DashboardStatsSection,
  DashboardStatsSectionSkeleton,
} from '@/features/main/dashboard/components/stats';
import { MonthlySpendingTrendCard } from '@/features/main/dashboard/components/chart-cards/monthly-spending-trends';
import { MonthlySpendingTrendCardSkeleton } from '@/features/main/dashboard/components/chart-cards/monthly-spending-trends-skeleton';
import { useGetBudgetSummary } from '@/features/main/dashboard/hooks/queries/use-get-budget-summary';
import { BudgetOverviewCard } from '@/features/main/dashboard/components/budget-section/overview-card';
import { BudgetOverviewCardSkeleton } from '@/features/main/dashboard/components/budget-section/overview-skeleton';
import { AddBudgetFormDialog } from '@/features/main/dashboard/components/budget-section/form/create-dialog';
import { EditBudgetDialog } from '@/features/main/dashboard/components/budget-section/form/edit-dialog';
import { useCreateNewBudget } from '@/features/main/dashboard/hooks/mutations/use-create-new-budget';
import { useEditBudget } from '@/features/main/dashboard/hooks/mutations/use-edit-budget';
import { useDeleteBudget } from '@/features/main/dashboard/hooks/mutations/use-delete-budget';
import type { BudgetSummary } from '@/features/main/dashboard/schemas/budget/summary/response.schema';

export const Route = createFileRoute('/(main)/(dashboard)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <ExpenseAnalyticsSection />

      <BudgetAnalyticsSection />
    </div>
  );
}

function ExpenseAnalyticsSection() {
  const {
    data,
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useGetExpenseCategorySummary();

  const {
    data: monthlyTrends,
    isLoading: isTrendsLoading,
    isFetching: isTrendsFetching,
  } = useGetExpenseMonthlyTrend();

  const {
    data: expenseSummary,
    isLoading: isSummaryLoading,
    isFetching: isSummaryFetching,
  } = useGetExpenseSummary();

  return (
    <>
      {isSummaryLoading ? (
        <DashboardStatsSectionSkeleton />
      ) : (
        <DashboardStatsSection
          data={expenseSummary!}
          isFetching={isSummaryFetching}
          className="sm:grid-cols-2 xl:grid-cols-4"
        />
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        {isCategoryLoading ? (
          <ExpensesChartCardSkeleton />
        ) : (
          <ExpensesChartCard data={data} isFetching={isCategoryFetching} />
        )}

        {isTrendsLoading ? (
          <MonthlySpendingTrendCardSkeleton />
        ) : (
          <MonthlySpendingTrendCard data={monthlyTrends} isFetching={isTrendsFetching} />
        )}
      </section>
    </>
  );
}

function BudgetAnalyticsSection() {
  const [editingBudget, setEditingBudget] = useState<BudgetSummary | null>(null);

  const {
    data: budgetSummary,
    isLoading: isBudgetLoading,
    isFetching: isBudgetFetching,
  } = useGetBudgetSummary({
    month: 6,
    year: 2026,
  });

  const { mutate: createBudget, isPending: isCreatePending } = useCreateNewBudget();

  const { mutate: editBudget, isPending: isEditPending } = useEditBudget();

  const { mutate: deleteBudget } = useDeleteBudget();

  return (
    <>
      {isBudgetLoading ? (
        <BudgetOverviewCardSkeleton />
      ) : (
        <BudgetOverviewCard
          data={budgetSummary}
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
      )}

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
