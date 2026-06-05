import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import type { ComponentProps, Dispatch, SetStateAction } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import { categoryEnum } from '../../schemas/enums/categrory-enum.schema';
import type { GetAllExpensesParam } from '../../schemas/get-all/param.schema';
import { DateRangePicker } from './date-range-picker';

export type ExpenseFiltersValue = Pick<
  GetAllExpensesParam,
  'search' | 'category' | 'startDate' | 'endDate'
>;

interface ExpenseFiltersProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: ExpenseFiltersValue;

  onChange: Dispatch<SetStateAction<ExpenseFiltersValue>>;
}

export function ExpenseFilters({ className, value, onChange, ...props }: ExpenseFiltersProps) {
  const [localSearch, setLocalSearch] = useState(value.search ?? '');
  const [debouncedSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    onChange((prev) => ({
      ...prev,

      search: debouncedSearch,
    }));
  }, [debouncedSearch, onChange]);

  return (
    <div className={cn('bg-card flex flex-wrap gap-4 rounded-xl border p-4', className)} {...props}>
      <div className="relative min-w-62.5 flex-1">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <Input
          placeholder="Search expenses..."
          className="pl-9"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <Select
        value={value.category}
        onValueChange={(value_) =>
          onChange({
            ...value,

            category: value_ === 'ALL' ? undefined : (value_ as ExpenseFiltersValue['category']),
          })
        }>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Categories</SelectItem>

          {categoryEnum.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DateRangePicker
        disableFutureDates
        value={{
          from: value.startDate ? new Date(value.startDate) : undefined,

          to: value.endDate ? new Date(value.endDate) : undefined,
        }}
        onChange={(range) =>
          onChange({
            ...value,
            startDate: range?.from,
            endDate: range?.to,
          })
        }
      />
    </div>
  );
}
