import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

import { cn } from '@/lib/utils';

export type StatsCardData = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
};

interface DashboardStatsCardProps extends ComponentProps<typeof Card> {
  data: StatsCardData;
  isFetching?: boolean;
}

export function DashboardStatsCard({
  className,
  data,
  isFetching = false,
  ...props
}: DashboardStatsCardProps) {
  const { title, description, value, icon: Icon, iconClassName } = data;

  return (
    <Card className={cn('relative', className)} {...props}>
      {isFetching && (
        <div className="bg-background/80 absolute top-2.5 left-2.5 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm backdrop-blur-sm">
          <Spinner className="text-primary h-3 w-3" />
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardDescription>{title}</CardDescription>

          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>

        <div className={cn('rounded-full p-3', iconClassName)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-muted-foreground text-sm">{description}</div>
      </CardContent>
    </Card>
  );
}
