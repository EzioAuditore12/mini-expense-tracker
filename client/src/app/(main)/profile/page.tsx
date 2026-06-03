import { H1 } from '@/components/ui/typography';
import { useGetProfile } from '@/features/common/hooks/queries/use-get-profile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isLoading } = useGetProfile();

  if (error)
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <H1 className="text-red-500">Unable to fetch</H1>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <H1 className="animate-pulse">Loading</H1>
      </div>
    );

  return <div>{JSON.stringify(data)}</div>;
}
