import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useAppForm } from '@/hooks/use-app-form';

import { type RegisterParams, registerParamSchema } from '../schemas/param.schema';

interface RegisterFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: RegisterParams) => void;
  isRequestPending: boolean;
}

export function RegisterForm({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: RegisterFormProps) {
  const RegisterForm = useAppForm({
    validators: { onChange: registerParamSchema },
    defaultValues: {
      name: '',
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
        RegisterForm.handleSubmit();
      }}
      {...props}>
      <RegisterForm.AppField name="name">
        {(field) => <field.InputField className="mt-2" placeholder="Name..." type="text" />}
      </RegisterForm.AppField>

      <RegisterForm.AppField name="email">
        {(field) => <field.InputField placeholder="name@example.com" type="email" />}
      </RegisterForm.AppField>

      <RegisterForm.AppField name="password">
        {(field) => <field.InputField type="password" />}
      </RegisterForm.AppField>

      <Button type="submit" className="w-full" disabled={isRequestPending}>
        {isRequestPending ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
