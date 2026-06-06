import { Skeleton } from '@/components/ui/skeleton';

export function ExpensePageHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-60" />
      </div>
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}

export function ExpenseFiltersSkeleton() {
  return (
    <div className="bg-card flex flex-wrap gap-4 rounded-xl border p-4">
      <Skeleton className="h-10 min-w-62.5 flex-1" />
      <Skeleton className="h-10 w-45" />
      <Skeleton className="h-10 w-[240px]" />
      <Skeleton className="h-10 w-32 animate-pulse" />
    </div>
  );
}

export function ExpenseTableSkeleton() {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted/50 border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-32" />
              </th>
              <th className="text-muted-foreground h-12 w-[80px] px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="text-muted-foreground h-12 w-[80px] px-4 text-left align-middle font-medium">
                <Skeleton className="h-4 w-12" />
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="hover:bg-muted/50 border-b transition-colors">
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-16" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-48" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ExpenseTablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1">
      <Skeleton className="h-9 w-24 rounded-md" />
      <Skeleton className="h-9 w-9 rounded-md" />
      <Skeleton className="h-9 w-9 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  );
}

export function ExpensePageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ExpensePageHeaderSkeleton />
      <ExpenseFiltersSkeleton />
      <ExpenseTableSkeleton />
      <ExpenseTablePaginationSkeleton />
    </div>
  );
}
