import '../index.css';
import { RouterProvider } from '@tanstack/react-router';

import { getRouter } from '@/lib/router';

// Fix: Use ReturnType to get the type of the router instance
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export default function App() {
  const router = getRouter();
  return <RouterProvider router={router} />;
}
