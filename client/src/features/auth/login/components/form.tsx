import type { ComponentProps } from 'react';
import { Info, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { env } from '@/env';

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
      email: env.VITE_PUBLIC_TEST_EMAIL,
      password: env.VITE_PUBLIC_TEST_PASSWORD,
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });

  return (
    <form
      className={cn('flex flex-col gap-5', className)}
      onSubmit={(e) => {
        e.preventDefault();
        LoginForm.handleSubmit();
      }}
      {...props}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <LoginForm.AppField name="email">
          {(field) => <field.InputField placeholder="name@example.com" type="email" />}
        </LoginForm.AppField>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <LoginForm.AppField name="password">
          {(field) => <field.InputField placeholder="••••••••" type="password" />}
        </LoginForm.AppField>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isRequestPending}>
        {isRequestPending ? (
          'Logging In...'
        ) : (
          <>
            <LogIn className="size-4" />
            Login
          </>
        )}
      </Button>

      <div className="bg-muted/50 flex items-start gap-2 rounded-lg border px-3 py-2.5">
        <Info className="text-muted-foreground mt-0.5 size-3.5 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          Pre-filled with test credentials for seeded demo data. You can register a new account if
          you prefer.
        </p>
      </div>
    </form>
  );
}
