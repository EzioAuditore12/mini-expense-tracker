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

import type { GetExpenseMonthlyTrendResponse } from '../../schemas/expense-monthly-trend/response.schema';
import { cn } from '@/lib/utils';

interface MonthlySpendingTrendCardProps extends ComponentProps<typeof Card> {
  data?: GetExpenseMonthlyTrendResponse;
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
  ...props
}: MonthlySpendingTrendCardProps) {
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
    <Card className={cn('flex flex-col', className)} {...props}>
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
