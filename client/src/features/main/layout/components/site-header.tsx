import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/95 sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <span className="text-base font-medium">Mini Expense Tracker</span>
        <div className="ml-auto flex items-center gap-2">
          <AnimatedThemeToggler
            variant="circle"
            duration={500}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-8 items-center justify-center rounded-full transition-colors"
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </header>
  );
}
