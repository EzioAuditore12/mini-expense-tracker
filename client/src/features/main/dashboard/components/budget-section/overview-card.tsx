import type { ComponentProps } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { cn } from '@/lib/utils';
import type { BudgetSummaryResponse } from '../../schemas/budget/summary/response.schema';

interface BudgetOverviewCardProps extends ComponentProps<typeof Card> {
  data?: BudgetSummaryResponse;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function BudgetOverviewCard({
  className,
  data = [],
  onEdit,
  onDelete,
  ...props
}: BudgetOverviewCardProps) {
  return (
    <Card className={cn(className)} {...props}>
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
                  ₹{budget.spent.toLocaleString()} / ₹{budget.limitAmount.toLocaleString()}
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
                  ? `₹${Math.abs(budget.remaining).toLocaleString()} over budget`
                  : `₹${budget.remaining.toLocaleString()} remaining`}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
