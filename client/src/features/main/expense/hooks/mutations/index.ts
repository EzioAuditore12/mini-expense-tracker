import { useCreateExpense } from './use-create-expense';
import { useEditExpense } from './use-edit-expense';
import { useDeleteExpense } from './use-delete-expense';

export function useExpenseMutations() {
  const createExpense = useCreateExpense();
  const editExpense = useEditExpense();
  const deleteExpense = useDeleteExpense();

  return {
    createExpense,
    editExpense,
    deleteExpense,
    isCreatePending: createExpense.isPending,
    isEditPending: editExpense.isPending,
    isDeletePending: deleteExpense.isPending,
  };
}

export { useCreateExpense } from './use-create-expense';
export { useEditExpense } from './use-edit-expense';
export { useDeleteExpense } from './use-delete-expense';
