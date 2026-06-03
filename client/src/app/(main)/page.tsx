import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography';
import { useAuthStore } from '@/store/auth';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout, user } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    await navigate({ to: '/login', replace: true });
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
      <H1>Hello {user?.name}</H1>

      <Button onClick={handleLogout} variant={'destructive'}>
        Logout
      </Button>

      <Link to="/profile">Profile</Link>
    </div>
  );
}
