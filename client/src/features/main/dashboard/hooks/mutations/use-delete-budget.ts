import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteBudgetApi } from '../../api/budget/delete.api';

import { USE_GET_BUDGET_QUERY_KEY } from '../queries/use-get-budget-summary';

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BUDGET_QUERY_KEY] });

      toast.success('Budget Deleted', {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error('Failed to Delete Budget', {
        description: error.message,
      });
    },
  });
}
