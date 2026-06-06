import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProfileSkeleton() {
  return (
    <div className="animate-fade-in mx-auto max-w-5xl space-y-6 p-6">
      {/* Profile Header Skeleton */}
      <div className="bg-card relative overflow-hidden rounded-2xl border">
        <div className="bg-muted/40 relative h-32 w-full overflow-hidden sm:h-40" />
        <div className="px-6 pt-0 pb-6 sm:px-8">
          <div className="relative flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
            <div className="border-card bg-muted -mt-16 h-28 w-28 rounded-2xl border-4 shadow-md sm:h-32 sm:w-32" />
            <div className="mt-4 space-y-2 text-center sm:mt-0 sm:pb-2 sm:text-left">
              <Skeleton className="mx-auto h-7 w-48 sm:mx-0" />
              <Skeleton className="mx-auto h-4 w-64 sm:mx-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-36" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Account Details Card Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`flex items-start gap-4 rounded-lg border p-4 ${
                i === 3 ? 'sm:col-span-2' : ''
              }`}>
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-3/4 max-w-[200px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions Card Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-24" />
        </CardContent>
      </Card>
    </div>
  );
}
