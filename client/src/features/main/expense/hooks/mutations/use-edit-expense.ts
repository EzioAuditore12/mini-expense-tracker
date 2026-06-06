import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

import { USE_GET_ALL_EXPENSES_QUERY_KEY } from '../queries/use-get-all-expenses';
import { updateExpenseApi } from '../../api/update-expense.api';

export function useEditExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateExpenseApi>[1] }) =>
      updateExpenseApi(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY] });
      toast.success('Expense Updated', {
        description: `Updated ${data.category.toLowerCase()} to ${formatCurrency(data.amount)}.`,
      });
    },
    onError: (error) => {
      toast.error('Failed to Update Expense', {
        description: error.message,
      });
    },
  });
}
