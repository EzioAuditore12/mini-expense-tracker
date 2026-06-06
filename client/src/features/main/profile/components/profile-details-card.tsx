import { useState } from 'react';
import { User as UserIcon, Mail, Shield, Calendar, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { User } from '@/features/common/schemas/user.schema';

interface ProfileDetailsCardProps {
  user: User;
}

export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(user.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy ID: ', err);
    }
  };

  const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Account Details</CardTitle>
        <CardDescription>Verify and manage your basic profile information</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-2">
        {/* Name detail row */}
        <div className="hover:bg-muted/30 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="rounded-full bg-violet-500/10 p-2.5 text-violet-500">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm leading-none font-medium">Full Name</p>
            <p className="text-sm font-semibold">{user.name}</p>
          </div>
        </div>

        {/* Email detail row */}
        <div className="hover:bg-muted/30 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="rounded-full bg-blue-500/10 p-2.5 text-blue-500">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm leading-none font-medium">Email Address</p>
            <p className="max-w-[200px] truncate text-sm font-semibold sm:max-w-none">
              {user.email}
            </p>
          </div>
        </div>

        {/* Account ID detail row */}
        <div className="hover:bg-muted/30 flex items-start gap-4 rounded-lg border p-4 transition-colors sm:col-span-2">
          <div className="rounded-full bg-indigo-500/10 p-2.5 text-indigo-500">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-muted-foreground text-sm leading-none font-medium">Account ID</p>
            <div className="flex items-center gap-2">
              <code className="bg-muted rounded px-2 py-0.5 font-mono text-xs select-all">
                {user.id}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted h-8 w-8"
                onClick={handleCopyId}
                title="Copy ID">
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Date joined row */}
        <div className="hover:bg-muted/30 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="rounded-full bg-pink-500/10 p-2.5 text-pink-500">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm leading-none font-medium">Member Since</p>
            <p className="text-sm font-semibold">{formatDate(user.createdAt)}</p>
          </div>
        </div>

        {/* Date updated row */}
        <div className="hover:bg-muted/30 flex items-start gap-4 rounded-lg border p-4 transition-colors">
          <div className="rounded-full bg-orange-500/10 p-2.5 text-orange-500">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm leading-none font-medium">Last Updated</p>
            <p className="text-sm font-semibold">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
