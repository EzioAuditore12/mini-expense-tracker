import { useState } from 'react';
import { Info } from 'lucide-react';

import { BudgetOverviewCard } from './overview-card';
import { AddBudgetFormDialog } from './form/create-dialog';
import { EditBudgetDialog } from './form/edit-dialog';

import { useBudgetMutations } from '../../hooks/mutations';
import { useDashboardQueries } from '../../hooks/queries';
import type { BudgetSummary } from '../../schemas/budget/summary/response.schema';
import { categoryEnum } from '@/features/main/expense/schemas/enums/categrory-enum.schema';

interface BudgetAnalyticsSectionProps {
  month: number;
  year: number;
  queries: ReturnType<typeof useDashboardQueries>;
}

export function BudgetAnalyticsSection({ month, year, queries }: BudgetAnalyticsSectionProps) {
  const [editingBudget, setEditingBudget] = useState<BudgetSummary | null>(null);

  const { budgetSummary = [], isBudgetLoading, isBudgetFetching } = queries;

  const { createBudget, isCreatePending, editBudget, isEditPending, deleteBudget } =
    useBudgetMutations();

  const existingCategories = budgetSummary?.map((b) => b.category) ?? [];
  const hasBudgets = existingCategories.length > 0;
  const allCategoriesConfigured = existingCategories.length >= categoryEnum.length;

  return (
    <div className="flex flex-col gap-4">
      {!hasBudgets && !isBudgetLoading ? (
        <AddBudgetFormDialog
          handleSubmit={createBudget}
          isPending={isCreatePending}
          emptyState={true}
          defaultMonth={String(month)}
          defaultYear={String(year)}
          existingCategories={existingCategories}
        />
      ) : (
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

          {!isBudgetLoading && (
            <div className="mt-2">
              {allCategoriesConfigured ? (
                <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-amber-800 dark:text-amber-200">
                  <Info className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="text-sm">
                    <span className="font-semibold">All category budgets set.</span> You have
                    configured a budget for all available categories for this month. You cannot add
                    any more budgets.
                  </div>
                </div>
              ) : (
                <AddBudgetFormDialog
                  handleSubmit={createBudget}
                  isPending={isCreatePending}
                  emptyState={false}
                  defaultMonth={String(month)}
                  defaultYear={String(year)}
                  existingCategories={existingCategories}
                />
              )}
            </div>
          )}
        </>
      )}

      <EditBudgetDialog
        budget={editingBudget}
        onClose={() => setEditingBudget(null)}
        isPending={isEditPending}
        onSubmit={editBudget}
      />
    </div>
  );
}
