import type { Dispatch, SetStateAction } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

import { useAppForm } from '@/hooks/use-app-form';
import {
  updateBudgetParamSchema,
  type UpdateBudgetParam,
} from '../../../../schemas/budget/update/param.schema';

interface EditBudgetFormDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  defaultValues: UpdateBudgetParam;
  isPending: boolean;
  handleSubmit: (data: UpdateBudgetParam) => void;
}

export function EditBudgetFormDialog({
  open,
  defaultValues,
  onOpenChange,
  handleSubmit,
  isPending,
}: EditBudgetFormDialogProps) {
  const UpdateExpenseForm = useAppForm({
    validators: {
      onChange: updateBudgetParamSchema,
    },
    defaultValues,
    onSubmit: async ({ value }) => {
      handleSubmit(value);

      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateExpenseForm.handleSubmit();
          }}>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>

            <DialogDescription>Update a budget transaction.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6">
            <Field>
              <Label>Limit Amount</Label>

              <UpdateExpenseForm.AppField name="limitAmount">
                {(field) => (
                  <field.InputField className="mt-2" placeholder="Limited Amount" type="number" />
                )}
              </UpdateExpenseForm.AppField>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'UpdateBudget'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
