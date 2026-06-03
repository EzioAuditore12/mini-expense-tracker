import type { ComponentProps } from 'react';
import { useStore } from '@tanstack/react-form';

import { Button } from '../ui/button';

import { useFormContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';

export const SubmitButton = ({ className, children, ...props }: ComponentProps<typeof Button>) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      className={cn(className)}
      type="submit"
      disabled={isSubmitting || !canSubmit}
      {...props}>
      {children}
    </Button>
  );
};
