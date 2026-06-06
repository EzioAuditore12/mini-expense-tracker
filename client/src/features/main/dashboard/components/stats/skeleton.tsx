import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardStatsCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function DashboardStatsSectionSkeleton() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatsCardSkeleton />
      <DashboardStatsCardSkeleton />
      <DashboardStatsCardSkeleton />
      <DashboardStatsCardSkeleton />
    </section>
  );
}
