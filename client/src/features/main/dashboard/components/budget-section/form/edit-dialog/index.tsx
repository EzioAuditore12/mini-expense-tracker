import { EditBudgetFormDialog } from './form-dialog';

import type { updateBudgetApi } from '@/features/main/dashboard/api/budget/update.api';
import type { BudgetSummary } from '@/features/main/dashboard/schemas/budget/summary/response.schema';

interface EditBudgetDialogProps {
  budget: BudgetSummary | null;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (params: { id: string; data: Parameters<typeof updateBudgetApi>[1] }) => void;
}

export function EditBudgetDialog({ budget, onClose, onSubmit, isPending }: EditBudgetDialogProps) {
  if (!budget) return null;

  return (
    <EditBudgetFormDialog
      open={!!budget}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      defaultValues={{
        limitAmount: String(budget.limitAmount),
      }}
      isPending={isPending}
      handleSubmit={(data) => {
        onSubmit({
          id: budget.id,
          data,
        });
        onClose();
      }}
    />
  );
}
