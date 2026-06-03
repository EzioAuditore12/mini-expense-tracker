import { useAuthStore } from '@/store/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  loader: () => {
    const tokens = useAuthStore.getState().tokens;

    if (!tokens) throw redirect({ to: '/login', replace: true });
  },
});

function RouteComponent() {
  return <Outlet />;
}
