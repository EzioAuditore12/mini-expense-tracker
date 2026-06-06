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

import { useCreateExpense } from '@/features/main/expense/hooks/mutations/use-create-expense';
import { useGetAllExpenses } from '@/features/main/expense/hooks/queries/use-get-all-expenses';
import { useDeleteExpense } from '@/features/main/expense/hooks/mutations/use-delete-expense';
import { useEditExpense } from '@/features/main/expense/hooks/mutations/use-edit-expense';

import type { Expense } from '@/features/main/expense/schemas/expense.schema';
import { useExportExpenses } from '@/features/main/expense/hooks/queries/use-export-expenses';

import { ExpensePageSkeleton } from '@/features/main/expense/components/skeleton';

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

  const { mutate, isPending } = useCreateExpense();
  const { mutate: deleteExpense } = useDeleteExpense();
  const { mutate: editExpense, isPending: isEditPending } = useEditExpense();
  const { exportExpenses, isExporting } = useExportExpenses();

  if (isLoading) return <ExpensePageSkeleton />;

  return (
    <div className="flex flex-col gap-6 p-6">
      <ExpensePageHeader
        addExpenseDialogButton={
          <AddExpenseFormDialog handleSubmit={mutate} isPending={isPending} />
        }
      />
      <ExpenseFilters
        value={filters}
        onChange={setFilters}
        onExportCsv={exportExpenses}
        isExporting={isExporting}
      />
      <ExpenseDataTable
        columns={expenseColumns({
          onEdit: (id) => {
            const expense = data?.data.find((e) => e.id === id);
            if (expense) setEditingExpense(expense);
          },

          onDelete: (id) => {
            deleteExpense(id);
          },
        })}
        data={data?.data ?? []}
      />
      <ExpenseTablePagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />

      <EditExpenseDialog
        expense={editingExpense}
        onClose={() => setEditingExpense(null)}
        isPending={isEditPending}
        onSubmit={editExpense}
      />
    </div>
  );
}
