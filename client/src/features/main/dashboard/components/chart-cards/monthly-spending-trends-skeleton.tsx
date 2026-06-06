import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MonthlySpendingTrendCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="flex min-h-[300px] flex-1 items-end gap-2 px-6 pb-4">
        <div className="flex h-[200px] w-full items-end gap-4">
          <Skeleton className="h-[20%] flex-1" />
          <Skeleton className="h-[40%] flex-1" />
          <Skeleton className="h-[30%] flex-1" />
          <Skeleton className="h-[60%] flex-1" />
          <Skeleton className="h-[50%] flex-1" />
          <Skeleton className="h-[80%] flex-1" />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pt-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-44" />
      </CardFooter>
    </Card>
  );
}
