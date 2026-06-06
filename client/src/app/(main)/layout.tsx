import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, UserRound } from 'lucide-react';
import type { CSSProperties } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar, type NavMain } from '@/features/main/layout/components/sidebar';
import { SiteHeader } from '@/features/main/layout/components/site-header';

import { useAuthStore } from '@/store/auth';

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  loader: () => {
    const tokens = useAuthStore.getState().tokens;

    if (!tokens) throw redirect({ to: '/login', replace: true });
  },
});

const navMain: NavMain[] = [
  {
    title: 'Dashboard',
    target: '/',
    icon: LayoutDashboard,
    color: 'text-violet-500',
    items: [
      {
        title: 'Expense Analytics',
        targetId: 'expense-analytics',
      },
      {
        title: 'Budget Analytics',
        targetId: 'budget-analytics',
      },
    ],
  },
  {
    title: 'Expenses',
    target: '/expense',
    icon: UserRound,
    color: 'text-blue-500',
  },
];

function RouteComponent() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore((state) => state);

  const handleLogout = async () => {
    logout();
    await navigate({ to: '/login', replace: true });
  };

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as CSSProperties
      }>
      <AppSidebar variant="inset" navMain={navMain} user={user!} handleUserLogout={handleLogout} />
      <div className="border-border/60 flex min-h-0 min-w-0 flex-1 flex-col border-l">
        <SiteHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
