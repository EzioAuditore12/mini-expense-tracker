import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { monthItems } from './budget-section/form/month-items';
import { yearItems } from './budget-section/form/year-items';

interface DashboardDateFilterProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function DashboardDateFilter({
  month,
  year,
  onMonthChange,
  onYearChange,
}: DashboardDateFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={String(month)} onValueChange={(val) => onMonthChange(Number(val))}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {monthItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={String(year)} onValueChange={(val) => onYearChange(Number(val))}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {yearItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
