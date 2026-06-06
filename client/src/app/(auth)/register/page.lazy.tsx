import { Card, CardContent } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { H2 } from '@/components/ui/typography';
import { RegisterForm } from '@/features/auth/register/components/form';
import { useRegisterForm } from '@/features/auth/register/hooks/use-register-form';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/register/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useRegisterForm();

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-linear-to-br p-2">
      <Card className="w-full max-w-4xl overflow-hidden rounded-2xl border p-0 shadow-xl">
        <CardContent className="grid p-0">
          <Stack className="p-6 md:p-8" spacing={'md'}>
            <H2>Register Yourself</H2>

            <RegisterForm handleSubmit={mutate} isRequestPending={isPending} />

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800">
                Sign In
              </Link>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
