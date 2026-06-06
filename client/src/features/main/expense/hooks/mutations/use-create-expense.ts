import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

import { createExpenseApi } from '../../api/create-expense.api';
import { USE_GET_ALL_EXPENSES_QUERY_KEY } from '../queries/use-get-all-expenses';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpenseApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY] });
      toast.success('Expense Created', {
        description: `Added ${formatCurrency(data.amount)} to ${data.category.toLowerCase()}.`,
      });
    },
    onError: (error) => {
      toast.error('Failed to Create Expense', {
        description: error.message,
      });
    },
  });
}
