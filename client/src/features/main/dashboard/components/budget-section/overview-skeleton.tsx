import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import type { ComponentProps } from 'react';

export function BudgetOverviewCardSkeleton({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <Skeleton className="mb-2 h-6 w-36" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="flex justify-between">
              <Skeleton className="h-3.5 w-12" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
