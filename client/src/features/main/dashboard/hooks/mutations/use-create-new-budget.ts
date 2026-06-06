import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

import { createBudgetApi } from '../../api/budget/create.api';
import { USE_GET_BUDGET_QUERY_KEY } from '../queries/use-get-budget-summary';

export function useCreateNewBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudgetApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BUDGET_QUERY_KEY] });

      toast.success('Budget Created', {
        description: `Created a budget of ${formatCurrency(data.limitAmount)} for ${data.category.toLowerCase()}.`,
      });
    },
    onError: (error) => {
      toast.error('Failed to Create Budget', {
        description: error.message,
      });
    },
  });
}
