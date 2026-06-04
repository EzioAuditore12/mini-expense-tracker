import { motion } from 'motion/react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { ComponentProps } from 'react';
import { useRouter } from '@tanstack/react-router';

import type { NavMain } from './sidebar';

interface NavMainProps extends ComponentProps<typeof SidebarGroup> {
  items: NavMain[];
}

export function NavMain({ items }: NavMainProps) {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, i) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild onClick={() => router.navigate({ to: item.target })}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                  whileHover={{ x: 3 }}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="group/btn relative overflow-hidden transition-all duration-200">
                    {item.icon && (
                      <item.icon
                        className={`transition-all duration-200 group-hover/btn:scale-110 ${item.color ?? 'text-muted-foreground'}`}
                      />
                    )}
                    <span className="transition-colors duration-200">{item.title}</span>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
