import type { ComponentProps } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export function SpendingTrendCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card className={cn('min-h-87.5', className)} {...props}>
      <CardHeader>
        <CardTitle>Monthly Spending Trend</CardTitle>

        <CardDescription>Line chart goes here</CardDescription>
      </CardHeader>
    </Card>
  );
}
