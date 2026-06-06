import { useState, type ComponentProps } from 'react';
import { PlusIcon, WalletIcon } from 'lucide-react';

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
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useAppForm } from '@/hooks/use-app-form';

import { categoryEnum } from '@/features/main/expense/schemas/enums/categrory-enum.schema';
import {
  createBudgetParamSchema,
  type CreateBudgetParam,
} from '../../../schemas/budget/create/param.schema';
import { getMonth, getYear } from 'date-fns';
import { monthItems, yearItems } from '../../month-year-select';

const categoryItems = categoryEnum.map((category) => ({
  label: category.charAt(0) + category.slice(1).toLowerCase(),

  value: category,
}));

const currentDate = new Date();

const currentMonth = String(getMonth(currentDate) + 1);

const currentYear = String(getYear(currentDate));

interface CreateBudgetFormDialogProps extends ComponentProps<typeof Button> {
  isPending: boolean;
  handleSubmit: (data: CreateBudgetParam) => void;
  emptyState?: boolean;
}

export function AddBudgetFormDialog({
  className,
  handleSubmit,
  isPending,
  emptyState = false,
  ...props
}: CreateBudgetFormDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const AddBudgetForm = useAppForm({
    validators: {
      onChange: createBudgetParamSchema,
    },

    defaultValues: {
      limitAmount: '0',
      month: currentMonth,
      year: currentYear,
      category: 'ENTERTAINMENT',
    } as CreateBudgetParam,

    onSubmit: async ({ value }) => {
      console.log(value);

      handleSubmit(value);

      AddBudgetForm.reset();

      setOpen(false);
    },
  });

  const triggerButton = (
    <DialogTrigger asChild>
      <Button className={cn(className)} size="lg" {...props}>
        <PlusIcon />
        Add Budget
      </Button>
    </DialogTrigger>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {emptyState ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted mb-4 rounded-full p-3">
              <WalletIcon className="text-muted-foreground h-8 w-8" />
            </div>

            <h3 className="text-lg font-semibold">No budgets set</h3>

            <p className="text-muted-foreground mt-1 mb-6 max-w-sm text-sm">
              Please add a budget first to start tracking your spending against category limits.
            </p>

            {triggerButton}
          </CardContent>
        </Card>
      ) : (
        triggerButton
      )}

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AddBudgetForm.handleSubmit();
          }}>
          <DialogHeader>
            <DialogTitle>Add Budget</DialogTitle>

            <DialogDescription>Add a new budget.</DialogDescription>
          </DialogHeader>

          <Field>
            <Label>Category</Label>

            <AddBudgetForm.AppField name="category">
              {(field) => (
                <field.SelectField
                  items={categoryItems}
                  className="mt-2"
                  placeholder="Select category"
                />
              )}
            </AddBudgetForm.AppField>
          </Field>

          <FieldGroup className="mt-6">
            <Field>
              <Label>Limit Amount</Label>

              <AddBudgetForm.AppField name="limitAmount">
                {(field) => (
                  <field.InputField className="mt-2" placeholder="Limit Amount" type="number" />
                )}
              </AddBudgetForm.AppField>
            </Field>
          </FieldGroup>

          <Field>
            <Label>Month</Label>

            <AddBudgetForm.AppField name="month">
              {(field) => (
                <field.SelectField className="mt-2" placeholder="Select month" items={monthItems} />
              )}
            </AddBudgetForm.AppField>
          </Field>

          <Field>
            <Label>Year</Label>

            <AddBudgetForm.AppField name="year">
              {(field) => (
                <field.SelectField className="mt-2" placeholder="Select year" items={yearItems} />
              )}
            </AddBudgetForm.AppField>
          </Field>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Budget'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
