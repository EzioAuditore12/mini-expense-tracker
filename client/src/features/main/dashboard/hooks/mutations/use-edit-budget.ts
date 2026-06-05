import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBudgetApi } from '../../api/budget/update.api';
import { USE_GET_BUDGET_QUERY_KEY } from '../queries/use-get-budget-summary';

export function useEditBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateBudgetApi>[1] }) =>
      updateBudgetApi(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BUDGET_QUERY_KEY] });

      console.log(data);
      alert('Budget updated successfully');
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
