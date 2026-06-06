import '../index.css';
import { RouterProvider } from '@tanstack/react-router';

import { getRouter } from '@/lib/router';

/**
 * Module augmentation: registers the router type globally so TanStack Router
 * provides type-safe <Link>, useNavigate(), and route params across the app.
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export default function App() {
  const router = getRouter();
  return <RouterProvider router={router} />;
}
