import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import {
  ExpenseFilters,
  type ExpenseFiltersValue,
} from '@/features/main/expense/components/filters';
import { ExpensePageHeader } from '@/features/main/expense/components/header';

import { ExpenseDataTable } from '@/features/main/expense/components/table';
import { expenseColumns } from '@/features/main/expense/components/table/columns';

import { AddExpenseFormDialog } from '@/features/main/expense/components/add-form-dialog';
import { useCreateExpense } from '@/features/main/expense/hooks/mutations/use-create-expense';
import { useGetAllExpenses } from '@/features/main/expense/hooks/queries/use-get-all-expenses';
import { ExpenseTablePagination } from '@/features/main/expense/components/table/pagination';

export const Route = createFileRoute('/(main)/expense/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<ExpenseFiltersValue>({});

  const { data, isLoading } = useGetAllExpenses({
    page,
    pageSize: 10,
    ...filters,
  });

  const { mutate, isPending } = useCreateExpense();

  if (isLoading) return <div>Loading..</div>;

  console.log(data);

  return (
    <div className="flex flex-col gap-6 p-6">
      <ExpensePageHeader
        addExpenseDialogButton={
          <AddExpenseFormDialog handleSubmit={mutate} isPending={isPending} />
        }
      />
      <ExpenseFilters value={filters} onChange={setFilters} />
      <ExpenseDataTable columns={expenseColumns} data={data?.data ?? []} />
      <ExpenseTablePagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
