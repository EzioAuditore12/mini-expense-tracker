import { Activity, type ComponentProps } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useFieldContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';

import { FieldError } from './field-error';

type SelectFieldItem = {
  label: string;
  value: string;
};

interface SelectFieldProps extends ComponentProps<typeof SelectTrigger> {
  items: SelectFieldItem[];

  placeholder?: string;
}

export const SelectField = ({ className, items, placeholder, ...props }: SelectFieldProps) => {
  const field = useFieldContext<string>();

  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="w-full">
      <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
        <SelectTrigger className={cn('w-full', className)} {...props}>
          <SelectValue placeholder={placeholder ?? 'Select option'} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="min-h-5 text-sm text-red-500">
        <Activity mode={hasError ? 'visible' : 'hidden'}>
          <FieldError meta={field.state.meta} />
        </Activity>
      </div>
    </div>
  );
};
