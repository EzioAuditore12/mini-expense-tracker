import type { ComponentProps } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ExpensesChartCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card className={cn('min-h-87.5', className)} {...props}>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>

        <CardDescription>Pie chart goes here</CardDescription>
      </CardHeader>
    </Card>
  );
}
