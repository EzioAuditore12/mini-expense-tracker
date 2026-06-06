import { ReceiptTextIcon, TrendingUpIcon, WalletIcon, Layers3Icon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { DashboardStatsCard } from './card';

import type { GetExpenseSummaryResponse } from '../../schemas/expense/summary/response.schema';

import { cn } from '@/lib/utils';

interface DashboardStatsSectionProps extends ComponentProps<'section'> {
  data: GetExpenseSummaryResponse;
  isFetching?: boolean;
}

export function DashboardStatsSection({
  className,
  data,
  isFetching = false,
  ...props
}: DashboardStatsSectionProps) {
  return (
    <section className={cn('grid gap-4', className)} {...props}>
      <DashboardStatsCard
        isFetching={isFetching}
        data={{
          title: 'Total Expenses',

          value: `₹${data?.totalExpenses ?? 0}`,

          description: 'This month spending',

          icon: ReceiptTextIcon,

          iconClassName: 'bg-destructive/10 text-destructive',
        }}
      />

      <DashboardStatsCard
        isFetching={isFetching}
        data={{
          title: 'Highest Expense',

          value: `₹${data?.highestExpense?.amount ?? 0}`,

          description: data?.highestExpense?.category ?? 'No category',

          icon: TrendingUpIcon,

          iconClassName: 'bg-orange-500/10 text-orange-500',
        }}
      />

      <DashboardStatsCard
        isFetching={isFetching}
        data={{
          title: 'Transactions Count',

          value: String(data?.totalTransactions ?? 0),

          description: 'Total transactions',

          icon: Layers3Icon,

          iconClassName: 'bg-blue-500/10 text-blue-500',
        }}
      />

      <DashboardStatsCard
        isFetching={isFetching}
        data={{
          title: 'Most Used Category',

          value: data?.mostUsedCategory ?? 'N/A',

          description: 'Highest usage category',

          icon: WalletIcon,

          iconClassName: 'bg-green-500/10 text-green-500',
        }}
      />
    </section>
  );
}
export { DashboardStatsSectionSkeleton } from './skeleton';
