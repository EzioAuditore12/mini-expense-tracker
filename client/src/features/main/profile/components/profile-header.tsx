import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/features/common/schemas/user.schema';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const firstLetter = user.name ? user.name[0].toUpperCase() : '?';

  return (
    <div className="bg-card text-card-foreground relative overflow-hidden rounded-2xl border shadow-sm">
      {/* Visual Header Banner with premium gradient and grid pattern overlay */}
      <div className="relative h-32 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 sm:h-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />
        <div className="absolute top-4 right-4 animate-pulse">
          <Badge
            variant="secondary"
            className="border-white/20 bg-white/10 text-white backdrop-blur-md">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Active Session
          </Badge>
        </div>
      </div>

      {/* User Information Area */}
      <div className="px-6 pt-0 pb-6 sm:px-8">
        <div className="relative flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
          {/* Avatar Container overlapping the gradient banner */}
          <div className="border-card bg-muted -mt-16 flex h-28 w-28 items-center justify-center rounded-2xl border-4 shadow-md sm:h-32 sm:w-32">
            <Avatar className="h-full w-full rounded-xl">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white">
                {firstLetter}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Text Details */}
          <div className="mt-4 text-center sm:mt-0 sm:pb-2 sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{user.name}</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
