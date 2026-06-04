import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { DashboardDateRangePicker } from './date-range-picker';

export function DashboardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn(className)} {...props}>
      <DashboardDateRangePicker className="ml-auto" />
    </div>
  );
}
