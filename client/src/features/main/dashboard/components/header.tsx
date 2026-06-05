import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function DashboardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center justify-between', className)} {...props}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="text-muted-foreground">Track your expenses, budgets, and spending insights</p>
      </div>
    </div>
  );
}
