import { createLazyFileRoute } from '@tanstack/react-router';
import { AlertCircle, RotateCcw } from 'lucide-react';

import { useGetProfile } from '@/features/common/hooks/queries/use-get-profile';
import { ProfileHeader } from '@/features/main/profile/components/profile-header';
import { ProfileDetailsCard } from '@/features/main/profile/components/profile-details-card';
import { ProfileSkeleton } from '@/features/main/profile/components/profile-skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Route = createLazyFileRoute('/(main)/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, error, isLoading, refetch } = useGetProfile();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <Card className="border-destructive/30 w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertCircle className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Unable to Load Profile</CardTitle>
            <CardDescription className="text-muted-foreground mt-2 text-sm">
              We encountered an issue retrieving your account details. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => refetch()} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Retry Fetching
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-5xl space-y-6 p-6 duration-300 md:p-8">
      {/* Visual top banner & avatar card */}
      <ProfileHeader user={user} />

      {/* Grid containing details and stats summaries */}
      <div className="grid gap-6 md:grid-cols-1">
        {/* Spending statistics breakdown */}

        {/* Basic profile information fields */}
        <ProfileDetailsCard user={user} />
      </div>
    </div>
  );
}
