import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { useAuthStore } from '@/store/auth';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
  loader: () => {
    const tokens = useAuthStore.getState().tokens;

    if (tokens) throw redirect({ to: '/', replace: true });
  },
});

function RouteComponent() {
  return <Outlet />;
}
