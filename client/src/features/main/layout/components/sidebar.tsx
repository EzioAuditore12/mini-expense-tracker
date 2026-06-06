import { type LucideIcon } from 'lucide-react';
import { Logo } from '@/features/main/layout/components/logo';
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
  items?: {
    title: string;
    targetId: string;
  }[];
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
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent data-[slot=sidebar-menu-button]:p-2"
              asChild>
              <Logo />
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
