import { TrendingUpIcon } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import type { ComponentProps } from 'react';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import type { GetExpenseMonthlyTrendResponse } from '../../schemas/expense/monthly-trend/response.schema';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { MonthlySpendingTrendCardSkeleton } from './monthly-spending-trends-skeleton';

interface MonthlySpendingTrendCardProps extends ComponentProps<typeof Card> {
  data?: GetExpenseMonthlyTrendResponse;
  isFetching?: boolean;
  isLoading?: boolean;
}

const chartConfig = {
  total: {
    label: 'Expenses',

    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function MonthlySpendingTrendCard({
  className,
  data = [],
  isFetching = false,
  isLoading = false,
  ...props
}: MonthlySpendingTrendCardProps) {
  if (isLoading) {
    return <MonthlySpendingTrendCardSkeleton className={className} {...props} />;
  }

  const chartData = data.map((item) => ({
    ...item,

    label: format(new Date(item.year, item.month - 1), 'MMM'),
  }));

  const latestMonth = chartData[chartData.length - 1];

  const previousMonth = chartData[chartData.length - 2];

  const percentageChange =
    latestMonth && previousMonth
      ? Math.round(((latestMonth.total - previousMonth.total) / previousMonth.total) * 100)
      : 0;

  return (
    <Card className={cn('relative flex flex-col', className)} {...props}>
      {isFetching && (
        <div className="bg-background/80 absolute top-2.5 left-2.5 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm backdrop-blur-sm">
          <Spinner className="text-primary h-3 w-3" />
        </div>
      )}

      <CardHeader>
        <CardTitle>Monthly Spending Trend</CardTitle>

        <CardDescription>Monthly expense overview</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {percentageChange >= 0
            ? `Trending up by ${percentageChange}%`
            : `Trending down by ${Math.abs(percentageChange)}%`}
          <TrendingUpIcon className="h-4 w-4" />
        </div>

        <div className="text-muted-foreground leading-none">Showing monthly expense trends</div>
      </CardFooter>
    </Card>
  );
}
