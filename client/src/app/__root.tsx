import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalAlertDialog } from '@/components/global-alert-dialog';

const RootLayout = () => (
  <>
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
    <Toaster />
    <GlobalAlertDialog />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
});
