import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ExpensePageHeaderProps extends ComponentProps<'div'> {
  addExpenseDialogButton?: ReactNode;
}

export function ExpensePageHeader({
  className,
  addExpenseDialogButton,
  ...props
}: ExpensePageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)} {...props}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>

        <p className="text-muted-foreground">Manage and track your expenses</p>
      </div>

      {addExpenseDialogButton}
    </div>
  );
}
