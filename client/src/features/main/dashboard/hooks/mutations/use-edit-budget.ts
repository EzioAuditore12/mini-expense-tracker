import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/currency';

import { updateBudgetApi } from '../../api/budget/update.api';
import { USE_GET_BUDGET_QUERY_KEY } from '../queries/use-get-budget-summary';

export function useEditBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateBudgetApi>[1] }) =>
      updateBudgetApi(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BUDGET_QUERY_KEY] });

      toast.success('Budget Updated', {
        description: `Updated budget for ${data.category.toLowerCase()} to ${formatCurrency(data.limitAmount)}.`,
      });
    },
    onError: (error) => {
      toast.error('Failed to Update Budget', {
        description: error.message,
      });
    },
  });
}
