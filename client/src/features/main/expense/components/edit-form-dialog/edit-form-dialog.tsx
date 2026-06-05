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

import { categoryEnum } from '../../schemas/enums/categrory-enum.schema';

import {
  updateExpenseParamSchema,
  type UpdateExpenseParam,
} from '../../schemas/update/param.schema';

const categoryItems = categoryEnum.map((category) => ({
  label: category.charAt(0) + category.slice(1).toLowerCase(),

  value: category,
}));

interface EditExpenseFormDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  defaultValues: UpdateExpenseParam;
  isPending: boolean;
  handleSubmit: (data: UpdateExpenseParam) => void;
}

export function EditExpenseFormDialog({
  open,
  defaultValues,
  onOpenChange,
  handleSubmit,
  isPending,
}: EditExpenseFormDialogProps) {
  const EditExpenseForm = useAppForm({
    validators: {
      onChange: updateExpenseParamSchema,
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
            EditExpenseForm.handleSubmit();
          }}>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>

            <DialogDescription>Add a new expense transaction.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6">
            <Field>
              <Label>Amount</Label>

              <EditExpenseForm.AppField name="amount">
                {(field) => (
                  <field.InputField className="mt-2" placeholder="Amount" type="number" />
                )}
              </EditExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Category</Label>

              <EditExpenseForm.AppField name="category">
                {(field) => (
                  <field.SelectField
                    items={categoryItems}
                    className="mt-2"
                    placeholder="Select category"
                  />
                )}
              </EditExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Expense Date</Label>

              <EditExpenseForm.AppField name="expenseDate">
                {(field) => <field.DatePickerField disableFutureDates className="mt-2" />}
              </EditExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Note</Label>

              <EditExpenseForm.AppField name="note">
                {(field) => <field.InputField className="mt-2" placeholder="Note..." type="text" />}
              </EditExpenseForm.AppField>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
