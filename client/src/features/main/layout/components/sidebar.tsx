import { type LucideIcon } from 'lucide-react';
import { WalletIcon } from 'lucide-react';
import { type LinkProps, useLocation } from '@tanstack/react-router';
import { useEffect, type ComponentProps } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';

import { NavMain } from './nav-main';
import type { User } from '@/features/common/schemas/user.schema';
import { NavUser } from './nav-user';

export type NavMain = {
  title: string;
  target: LinkProps['to'];
  icon: LucideIcon;
  color: string;
};

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  navMain: NavMain[];
  user: User;
  handleUserLogout: () => void;
}

export function AppSidebar({
  className,
  navMain,
  user,
  handleUserLogout,
  ...props
}: AppSidebarProps) {
  const { setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar className={cn(className)} collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[slot=sidebar-menu-button]:p-2">
              <div className="bg-primary text-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg">
                <WalletIcon className="size-5" />
              </div>

              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold">ExpenseWise</span>

                <span className="text-muted-foreground truncate text-xs">
                  Personal finance dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} handleLogout={handleUserLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
