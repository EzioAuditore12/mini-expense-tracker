import type { ComponentProps } from 'react';

import { PlusIcon } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Field, FieldGroup } from '@/components/ui/field';

import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { useAppForm } from '@/hooks/use-app-form';

import { createExpenseParamSchema, type CreateExpenseParam } from '../schemas/create/param.schema';

import { categoryEnum } from '../schemas/enums/categrory-enum.schema';

const categoryItems = categoryEnum.map((category) => ({
  label: category.charAt(0) + category.slice(1).toLowerCase(),

  value: category,
}));

interface AddExpenseFormDialogProps extends ComponentProps<typeof Button> {
  isPending: boolean;
  handleSubmit: (data: CreateExpenseParam) => void;
}

export function AddExpenseFormDialog({
  className,
  handleSubmit,
  isPending,
  ...props
}: AddExpenseFormDialogProps) {
  const AddExpenseForm = useAppForm({
    validators: {
      onChange: createExpenseParamSchema,
    },

    defaultValues: {
      amount: '0',

      category: 'OTHER',

      expenseDate: new Date(),

      note: null,
    } as CreateExpenseParam,

    onSubmit: ({ value }) => {
      console.log(value);

      handleSubmit(value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(className)} size="lg" {...props}>
          <PlusIcon />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AddExpenseForm.handleSubmit();
          }}>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>

            <DialogDescription>Add a new expense transaction.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6">
            <Field>
              <Label>Amount</Label>

              <AddExpenseForm.AppField name="amount">
                {(field) => (
                  <field.InputField className="mt-2" placeholder="Amount" type="number" />
                )}
              </AddExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Category</Label>

              <AddExpenseForm.AppField name="category">
                {(field) => (
                  <field.SelectField
                    items={categoryItems}
                    className="mt-2"
                    placeholder="Select category"
                  />
                )}
              </AddExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Expense Date</Label>

              <AddExpenseForm.AppField name="expenseDate">
                {(field) => <field.DatePickerField className="mt-2" />}
              </AddExpenseForm.AppField>
            </Field>

            <Field>
              <Label>Note</Label>

              <AddExpenseForm.AppField name="note">
                {(field) => <field.InputField className="mt-2" placeholder="Note..." type="text" />}
              </AddExpenseForm.AppField>
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
