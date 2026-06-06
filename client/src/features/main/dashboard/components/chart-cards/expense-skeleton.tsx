import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export function ExpensesChartCardSkeleton({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className="items-center space-y-2 pb-0">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent className="flex min-h-[320px] flex-1 items-center justify-center pb-0">
        <div className="relative flex h-[200px] w-[200px] items-center justify-center">
          <Skeleton className="absolute h-[200px] w-[200px] rounded-full" />
          <div className="bg-card absolute z-10 h-[120px] w-[120px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-52" />
      </CardFooter>
    </Card>
  );
}
