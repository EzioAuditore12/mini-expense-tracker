import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import {
  ExpenseFilters,
  type ExpenseFiltersValue,
} from '@/features/main/expense/components/filters';
import { ExpensePageHeader } from '@/features/main/expense/components/header';

import { ExpenseDataTable } from '@/features/main/expense/components/table';
import { expenseColumns } from '@/features/main/expense/components/table/columns';

import { AddExpenseFormDialog } from '@/features/main/expense/components/add-form-dialog';
import { ExpenseTablePagination } from '@/features/main/expense/components/table/pagination';
import { EditExpenseDialog } from '@/features/main/expense/components/edit-form-dialog';

import type { Expense } from '@/features/main/expense/schemas/expense.schema';

import { useExportExpenses } from '@/features/main/expense/hooks/queries/use-export-expenses';
import { useExpenseMutations } from '@/features/main/expense/hooks/mutations';
import { useGetAllExpenses } from '@/features/main/expense/hooks/queries/use-get-all-expenses';

export const Route = createLazyFileRoute('/(main)/expense/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<ExpenseFiltersValue>({});
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { data, isLoading } = useGetAllExpenses({
    page,
    pageSize: 10,
    ...filters,
  });

  const { createExpense, editExpense, deleteExpense, isCreatePending, isEditPending } =
    useExpenseMutations();
  const { exportExpenses, isExporting } = useExportExpenses();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 p-6">
      <ExpensePageHeader
        addExpenseDialogButton={
          <AddExpenseFormDialog handleSubmit={createExpense.mutate} isPending={isCreatePending} />
        }
      />
      <ExpenseFilters
        value={filters}
        onChange={setFilters}
        onExportCsv={exportExpenses}
        isExporting={isExporting}
      />

      <ExpenseDataTable
        className="min-h-0 flex-1 overflow-y-auto"
        isLoading={isLoading}
        columns={expenseColumns({
          onEdit: (id) => {
            const expense = data?.data.find((e) => e.id === id);
            if (expense) setEditingExpense(expense);
          },

          onDelete: (id) => {
            deleteExpense.mutate(id);
          },
        })}
        data={data?.data ?? []}
      />
      <ExpenseTablePagination
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />

      <EditExpenseDialog
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        isPending={isEditPending}
        onSubmit={editExpense.mutate}
      />
    </div>
  );
}
