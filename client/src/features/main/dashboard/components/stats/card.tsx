import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
}

export function DashboardStatsCard({ className, data, ...props }: DashboardStatsCardProps) {
  const { title, description, value, icon: Icon, iconClassName } = data;

  return (
    <Card className={cn(className)} {...props}>
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
