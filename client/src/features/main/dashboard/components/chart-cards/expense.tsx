import { TrendingUpIcon } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import type { ComponentProps } from 'react';

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import type { GetExpenseCategorySummaryResponse } from '../../schemas/expense-category-summary/response.schema';
import { cn } from '@/lib/utils';

interface ExpensesChartCardProps extends ComponentProps<typeof Card> {
  data?: GetExpenseCategorySummaryResponse;
}

const chartConfig = {
  total: {
    label: 'Amount',
  },

  FOOD: {
    label: 'Food',
    color: 'var(--chart-1)',
  },

  TRANSPORT: {
    label: 'Transport',
    color: 'var(--chart-2)',
  },

  BILLS: {
    label: 'Bills',
    color: 'var(--chart-3)',
  },

  ENTERTAINMENT: {
    label: 'Entertainment',
    color: 'var(--chart-4)',
  },

  SHOPPING: {
    label: 'Shopping',
    color: 'var(--chart-5)',
  },

  HEALTH: {
    label: 'Health',
    color: 'var(--chart-6)',
  },

  EDUCATION: {
    label: 'Education',
    color: 'var(--chart-7)',
  },

  TRAVEL: {
    label: 'Travel',
    color: 'var(--chart-8)',
  },

  OTHER: {
    label: 'Other',
    color: 'var(--chart-9)',
  },
} satisfies ChartConfig;

export function ExpensesChartCard({ className, data = [], ...props }: ExpensesChartCardProps) {
  const chartData = data.map((item) => ({
    ...item,

    fill: `var(--color-${item.category})`,
  }));

  const totalExpenses = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className={cn('flex flex-col', className)} {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by Category</CardTitle>

        <CardDescription>Distribution of expenses across categories</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto h-80 w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Pie data={chartData} dataKey="total" nameKey="category" stroke="0" cx="40%" />

            <ChartLegend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={<ChartLegendContent />}
              className="flex-col items-start gap-2 pl-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total spent ₹{totalExpenses.toLocaleString()}
          <TrendingUpIcon className="h-4 w-4" />
        </div>

        <div className="text-muted-foreground leading-none">
          Showing expense distribution by category
        </div>
      </CardFooter>
    </Card>
  );
}
