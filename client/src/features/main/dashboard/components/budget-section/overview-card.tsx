import type { ComponentProps } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { cn } from '@/lib/utils';
import type { BudgetSummaryResponse } from '../../schemas/budget/summary/response.schema';
import { Spinner } from '@/components/ui/spinner';
import { formatCurrency } from '@/lib/currency';

import { BudgetOverviewCardSkeleton } from './overview-skeleton';

interface BudgetOverviewCardProps extends ComponentProps<typeof Card> {
  data?: BudgetSummaryResponse;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isFetching?: boolean;
  isLoading?: boolean;
}

export function BudgetOverviewCard({
  className,
  data = [],
  onEdit,
  onDelete,
  isFetching = false,
  isLoading = false,
  ...props
}: BudgetOverviewCardProps) {
  if (isLoading) {
    return <BudgetOverviewCardSkeleton className={className} {...props} />;
  }

  return (
    <Card className={cn('relative', className)} {...props}>
      {isFetching && (
        <div className="bg-background/80 absolute top-2.5 left-2.5 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm backdrop-blur-sm">
          <Spinner className="text-primary h-3 w-3" />
        </div>
      )}

      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>

        <CardDescription>Track spending against category budgets</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {data.map((budget) => (
          <div key={budget.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{budget.category}</p>

                <p className="text-muted-foreground text-sm">
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limitAmount)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium',

                    budget.status === 'ON_TRACK' && 'bg-green-500/10 text-green-500',

                    budget.status === 'APPROACHING_LIMIT' && 'bg-yellow-500/10 text-yellow-500',

                    budget.status === 'OVER_BUDGET' && 'bg-red-500/10 text-red-500'
                  )}>
                  {budget.status}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit?.(budget.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => onDelete?.(budget.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Progress value={Math.min(budget.percentage, 100)} />

            <div className="text-muted-foreground flex justify-between text-xs">
              <span>{budget.percentage}% used</span>

              <span>
                {budget.remaining < 0
                  ? `${formatCurrency(Math.abs(budget.remaining))} over budget`
                  : `${formatCurrency(budget.remaining)} remaining`}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
