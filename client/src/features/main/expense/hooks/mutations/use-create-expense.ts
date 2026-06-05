import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createExpenseApi } from '../../api/create-expense.api';
import { USE_GET_ALL_EXPENSES_QUERY_KEY } from '../queries/use-get-all-expenses';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpenseApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY] });

      console.log(data);
      alert(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
