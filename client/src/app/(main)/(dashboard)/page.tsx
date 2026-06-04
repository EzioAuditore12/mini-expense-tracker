import { ExpensesChartCard } from '@/features/main/dashboard/components/expense-chart-card';
import { DashboardHeader } from '@/features/main/dashboard/components/header';
import { SpendingTrendCard } from '@/features/main/dashboard/components/spending-data-card';
import {
  DashboardStatsCard,
  type StatsCardData,
} from '@/features/main/dashboard/components/stats-card';
import { createFileRoute } from '@tanstack/react-router';
import { IndianRupeeIcon, ReceiptTextIcon, TrendingUpIcon, WalletIcon } from 'lucide-react';

export const Route = createFileRoute('/(main)/(dashboard)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCardsData.map((card) => (
          <DashboardStatsCard key={card.title} data={card} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ExpensesChartCard />

        <SpendingTrendCard />
      </section>
    </div>
  );
}
const statsCardsData: StatsCardData[] = [
  {
    title: 'Total Expenses',
    value: '₹12,430',
    description: '+12.4% from last month',
    icon: ReceiptTextIcon,
    iconClassName: 'bg-destructive/10 text-destructive',
  },

  {
    title: 'Total Income',
    value: '₹50,000',
    description: '+8.2% from last month',
    icon: WalletIcon,
    iconClassName: 'bg-green-500/10 text-green-500',
  },

  {
    title: 'Remaining Balance',
    value: '₹37,570',
    description: 'Healthy savings this month',
    icon: IndianRupeeIcon,
    iconClassName: 'bg-blue-500/10 text-blue-500',
  },

  {
    title: 'Highest Expense',
    value: '₹3,200',
    description: 'Travel category',
    icon: TrendingUpIcon,
    iconClassName: 'bg-orange-500/10 text-orange-500',
  },
];
