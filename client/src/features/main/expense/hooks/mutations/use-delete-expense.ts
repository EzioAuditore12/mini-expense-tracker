import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USE_GET_ALL_EXPENSES_QUERY_KEY } from '../queries/use-get-all-expenses';
import { deleteExpenseApi } from '../../api/delete-expense.api';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY] });

      console.log(data.message);
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
