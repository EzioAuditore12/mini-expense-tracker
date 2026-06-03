import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { H2 } from '@/components/ui/typography';

import { useLoginForm } from '@/features/auth/login/hooks/use-login-form';

import { LoginBanner } from '@/features/auth/login/components/banner';
import { LoginForm } from '@/features/auth/login/components/form';

export const Route = createFileRoute('/(auth)/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useLoginForm();

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-linear-to-br p-2">
      <Card className="w-full max-w-4xl overflow-hidden rounded-2xl border p-0 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Stack className="p-6 md:p-8" spacing={'md'}>
            <H2>Welcome Back ! </H2>

            <LoginForm handleSubmit={mutate} isRequestPending={isPending} />

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800">
                Sign Up
              </Link>
            </div>
          </Stack>

          <LoginBanner />
        </CardContent>
      </Card>
    </div>
  );
}
