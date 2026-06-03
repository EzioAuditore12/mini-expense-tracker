import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useAppForm } from '@/hooks/use-app-form';

import { type LoginParams, loginParamSchema } from '../schemas/param.schema';

interface LoginFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: LoginParams) => void;
  isRequestPending: boolean;
}

export function LoginForm({ className, handleSubmit, isRequestPending, ...props }: LoginFormProps) {
  const LoginForm = useAppForm({
    validators: { onChange: loginParamSchema },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });

  return (
    <form
      className={cn('flex flex-col items-center justify-center gap-4', className)}
      onSubmit={(e) => {
        e.preventDefault();
        LoginForm.handleSubmit();
      }}
      {...props}>
      <LoginForm.AppField name="email">
        {(field) => (
          <field.InputField className="mt-2" placeholder="name@example.com" type="email" />
        )}
      </LoginForm.AppField>

      <LoginForm.AppField name="password">
        {(field) => <field.InputField type="password" />}
      </LoginForm.AppField>

      <Button type="submit" className="w-full" disabled={isRequestPending}>
        {isRequestPending ? 'Logging In...' : 'Login'}
      </Button>
    </form>
  );
}
