import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { getMonth, getYear } from 'date-fns';

import { MonthYearSelect } from '@/features/main/dashboard/components/month-year-select';
import { DashboardHeader } from '@/features/main/dashboard/components/header';
import { ExpenseAnalyticsSection } from '@/features/main/dashboard/components/expense-analytics-section';
import { BudgetAnalyticsSection } from '@/features/main/dashboard/components/budget-section/budget-analytics-section';
import { useDashboardQueries } from '@/features/main/dashboard/hooks/queries';

export const Route = createFileRoute('/(main)/(dashboard)/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [month, setMonth] = useState<number>(() => getMonth(new Date()) + 1);
  const [year, setYear] = useState<number>(() => getYear(new Date()));

  const dashboardQueries = useDashboardQueries({ month, year });

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
      <DashboardHeader>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </DashboardHeader>

      <div id="expense-analytics" className="scroll-mt-24">
        <ExpenseAnalyticsSection queries={dashboardQueries} />
      </div>

      <div id="budget-analytics" className="scroll-mt-24">
        <BudgetAnalyticsSection month={month} year={year} queries={dashboardQueries} />
      </div>
    </div>
  );
}
