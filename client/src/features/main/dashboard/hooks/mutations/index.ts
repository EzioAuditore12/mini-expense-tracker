import { useCreateNewBudget } from './use-create-new-budget';
import { useEditBudget } from './use-edit-budget';
import { useDeleteBudget } from './use-delete-budget';

export * from './use-create-new-budget';
export * from './use-edit-budget';
export * from './use-delete-budget';

export function useBudgetMutations() {
  const createBudget = useCreateNewBudget();
  const editBudget = useEditBudget();
  const deleteBudget = useDeleteBudget();

  return {
    createBudget: createBudget.mutate,
    isCreatePending: createBudget.isPending,
    editBudget: editBudget.mutate,
    isEditPending: editBudget.isPending,
    deleteBudget: deleteBudget.mutate,
    isDeletePending: deleteBudget.isPending,
  };
}
