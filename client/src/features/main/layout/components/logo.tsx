import { WalletIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  subtitleClassName?: string;
  hideSubtitle?: boolean;
}

export function Logo({
  className,
  iconContainerClassName,
  iconClassName,
  textClassName,
  subtitleClassName,
  hideSubtitle = false,
}: LogoProps) {
  return (
    <Link to="/" className={cn('flex w-fit items-center gap-2', className)}>
      <div
        className={cn(
          'bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg',
          iconContainerClassName
        )}>
        <WalletIcon className={cn('size-6', iconClassName)} />
      </div>

      <div className="grid flex-1 text-left leading-tight">
        <span className={cn('truncate text-base font-semibold', textClassName)}>ExpenseWise</span>
        {!hideSubtitle && (
          <span className={cn('text-muted-foreground truncate text-xs', subtitleClassName)}>
            Personal finance dashboard
          </span>
        )}
      </div>
    </Link>
  );
}
