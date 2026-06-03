import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const H1 = ({ className, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-black dark:text-white',
        className
      )}
      {...props}
    />
  );
};
export const H2 = ({ className, ...props }: ComponentProps<'h2'>) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight text-balance text-black dark:text-white',
        className
      )}
      {...props}
    />
  );
};

export const H3 = ({ className, ...props }: ComponentProps<'h3'>) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white',
        className
      )}
      {...props}
    />
  );
};

export const H4 = ({ className, ...props }: ComponentProps<'h4'>) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight text-black dark:text-white',
        className
      )}
      {...props}
    />
  );
};

export const P = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <p
      className={cn('leading-7 text-black not-first:mt-6 dark:text-white', className)}
      {...props}
    />
  );
};

export const Blockquote = ({ className, ...props }: ComponentProps<'blockquote'>) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 text-black italic dark:text-white', className)}
      {...props}
    />
  );
};

export const List = ({ className, ...props }: ComponentProps<'ul'>) => {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc text-black dark:text-white [&>li]:mt-2', className)}
      {...props}
    />
  );
};
