import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ExpenseCategoryBadge } from './category-badge';

import type { Expense } from '../../schemas/expense.schema';
import { formatCurrency } from '@/lib/currency';

interface ExpenseColumnsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const expenseColumns = ({ onEdit, onDelete }: ExpenseColumnsProps): ColumnDef<Expense>[] => [
  {
    accessorKey: 'category',

    header: 'Category',

    cell: ({ row }) => <ExpenseCategoryBadge category={row.original.category} />,
  },

  {
    accessorKey: 'amount',

    header: 'Amount',

    cell: ({ row }) => <div className="font-medium">{formatCurrency(row.original.amount)}</div>,
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

  {
    id: 'edit',

    header: 'Edit',

    cell: ({ row }) => (
      <Button variant="ghost" size="icon" onClick={() => onEdit(row.original.id)}>
        <Pencil className="h-4 w-4" />
      </Button>
    ),
  },

  {
    id: 'delete',

    header: 'Delete',

    cell: ({ row }) => (
      <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    ),
  },
];
