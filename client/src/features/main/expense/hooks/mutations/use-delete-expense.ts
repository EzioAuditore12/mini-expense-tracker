import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { USE_GET_ALL_EXPENSES_QUERY_KEY } from '../queries/use-get-all-expenses';
import { deleteExpenseApi } from '../../api/delete-expense.api';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY] });
      toast.success('Expense Deleted', {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error('Failed to Delete Expense', {
        description: error.message,
      });
    },
  });
}
