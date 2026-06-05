import type { ColumnDef } from '@tanstack/react-table';

import { ExpenseCategoryBadge } from './category-badge';

import type { Expense } from '../../schemas/expense.schema';

export const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'category',

    header: 'Category',

    cell: ({ row }) => <ExpenseCategoryBadge category={row.original.category} />,
  },

  {
    accessorKey: 'amount',

    header: 'Amount',

    cell: ({ row }) => <div className="font-medium">₹{row.original.amount.toLocaleString()}</div>,
  },

  {
    accessorKey: 'expenseDate',

    header: 'Date',

    cell: ({ row }) => <div>{new Date(row.original.expenseDate).toLocaleDateString()}</div>,
  },

  {
    accessorKey: 'note',

    header: 'Note',
  },
];
