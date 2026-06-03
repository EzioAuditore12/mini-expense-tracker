import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import LoginBannerImage from '../assets/banner.jpg';

export function LoginBanner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('bg-muted relative hidden md:block', className)} {...props}>
      <img
        src={LoginBannerImage}
        alt="Login side illustration"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
}
