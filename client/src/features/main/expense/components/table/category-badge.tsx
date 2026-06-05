import {
  BeefIcon,
  BusIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  TicketIcon,
  PlaneIcon,
  CircleHelpIcon,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { CategoryEnum } from '../../schemas/enums/categrory-enum.schema';

export type CategoryConfig = Record<
  CategoryEnum,
  {
    label: string;
    className: string;
    icon: LucideIcon;
  }
>;

export const categoryConfig: CategoryConfig = {
  FOOD: {
    label: 'Food',
    className: 'bg-green-500/10 text-green-600 border-green-500/20',
    icon: BeefIcon,
  },

  TRANSPORT: {
    label: 'Transport',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: BusIcon,
  },

  BILLS: {
    label: 'Bills',
    className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    icon: ReceiptIcon,
  },

  ENTERTAINMENT: {
    label: 'Entertainment',
    className: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
    icon: TicketIcon,
  },

  SHOPPING: {
    label: 'Shopping',
    className: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    icon: ShoppingBagIcon,
  },

  HEALTH: {
    label: 'Health',
    className: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: HeartPulseIcon,
  },

  EDUCATION: {
    label: 'Education',
    className: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    icon: GraduationCapIcon,
  },

  TRAVEL: {
    label: 'Travel',
    className: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    icon: PlaneIcon,
  },

  OTHER: {
    label: 'Other',
    className: 'bg-muted text-muted-foreground',
    icon: CircleHelpIcon,
  },
};

interface ExpenseCategoryBadgeProps {
  category: CategoryEnum;
}

export function ExpenseCategoryBadge({ category }: ExpenseCategoryBadgeProps) {
  const config = categoryConfig[category];

  const Icon = config.icon;
  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />

      {config.label}
    </Badge>
  );
}
