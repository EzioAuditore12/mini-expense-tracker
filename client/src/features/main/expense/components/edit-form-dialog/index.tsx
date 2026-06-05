import type { Expense } from '../../schemas/expense.schema';
import { EditExpenseFormDialog } from './edit-form-dialog';
import type { updateExpenseApi } from '../../api/update-expense.api';

interface EditExpenseDialogProps {
  expense: Expense | null;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (params: { id: string; data: Parameters<typeof updateExpenseApi>[1] }) => void;
}

export function EditExpenseDialog({
  expense,
  onClose,
  onSubmit,
  isPending,
}: EditExpenseDialogProps) {
  if (!expense) return null;

  return (
    <EditExpenseFormDialog
      open={!!expense}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      defaultValues={{
        amount: expense.amount.toString(),
        category: expense.category,
        expenseDate: new Date(expense.expenseDate),
        note: expense.note,
      }}
      isPending={isPending}
      handleSubmit={(data) => {
        onSubmit({
          id: expense.id,
          data,
        });
        onClose();
      }}
    />
  );
}
