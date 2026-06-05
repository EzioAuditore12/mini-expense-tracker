import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudgetApi } from '../../api/budget/create.api';
import { USE_GET_BUDGET_QUERY_KEY } from '../queries/use-get-budget-summary';

export function useCreateNewBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudgetApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BUDGET_QUERY_KEY] });

      console.log(data);
      alert(JSON.stringify(data));
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
}
