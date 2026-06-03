import type { ComponentProps } from 'react';

import { useFieldContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { FieldError } from './field-error';

export const InputField = ({ className, ...inputProps }: ComponentProps<typeof Input>) => {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="w-full">
      <Input
        className={cn('mt-2', hasError && 'border-red-500 focus:border-red-500', className)}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...inputProps}
      />
      <div className="min-h-5 text-sm text-red-500">
        {hasError && <FieldError meta={field.state.meta} />}
      </div>
    </div>
  );
};
