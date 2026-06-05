import { endOfToday, format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import { Activity, type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useFieldContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';

import { FieldError } from './field-error';

interface DatePickerFieldProps extends ComponentProps<typeof Button> {
  placeholder?: string;
  disableFutureDates?: boolean;
}

export const DatePickerField = ({
  className,
  placeholder,
  disableFutureDates,
  ...props
}: DatePickerFieldProps) => {
  const field = useFieldContext<Date>();

  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!field.state.value}
            className={cn(
              'data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal',
              className
            )}
            {...props}>
            {field.state.value ? (
              format(field.state.value, 'PPP')
            ) : (
              <span>{placeholder ?? 'Pick a date'}</span>
            )}

            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            onSelect={(date) => {
              if (date) {
                field.handleChange(date);
              }
            }}
            defaultMonth={field.state.value}
            disabled={disableFutureDates ? (date) => date > endOfToday() : undefined}
          />
        </PopoverContent>
      </Popover>

      <div className="min-h-5 text-sm text-red-500">
        <Activity mode={hasError ? 'visible' : 'hidden'}>
          <FieldError meta={field.state.meta} />
        </Activity>
      </div>
    </div>
  );
};
