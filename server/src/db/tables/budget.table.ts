import {
  sqliteTable,
  text,
  real,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { z } from 'zod';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';

import { SnowFlakeId } from '@/utils/snowflake';

import { userTable } from './user.table';
import { categoryEnum } from './enums/category.enum';

export const BUDGET_TABLE_NAME = 'budget';

export const budgetTable = sqliteTable(
  BUDGET_TABLE_NAME,
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate().toString()),

    userId: text('user_id')
      .references(() => userTable.id, { onDelete: 'cascade' })
      .notNull(),

    category: text('category', {
      enum: categoryEnum,
    }).notNull(),

    limitAmount: real('limit_amount').notNull(),

    month: integer('month').notNull(),

    year: integer('year').notNull(),

    createdAt: integer('created_at', {
      mode: 'timestamp',
    })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer('updated_at', {
      mode: 'timestamp',
    })
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex('budget_unique_idx').on(t.userId, t.category, t.month, t.year),
  ],
);

export const budgetSchema = createSelectSchema(budgetTable, {
  month: z.coerce
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12'),
  year: z.coerce.number().int().positive('Year must be a positive number'),
});

export const budgetInsertSchema = createInsertSchema(budgetTable, {
  limitAmount: z.coerce
    .number()
    .positive('Limit amount should be greater than 0'),
  month: z.coerce
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12'),
  year: z.coerce.number().int().positive('Year must be a positive number'),
});

export const budgetUpdateSchema = createUpdateSchema(budgetTable, {
  limitAmount: z.coerce
    .number()
    .positive('Limit amount should be greater than 0')
    .optional(),
  month: z.coerce
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12')
    .optional(),
  year: z.coerce
    .number()
    .int()
    .positive('Year must be a positive number')
    .optional(),
});

export type Budget = z.infer<typeof budgetSchema>;
export type BudgetInsert = z.infer<typeof budgetInsertSchema>;
export type BudgetUpdate = z.infer<typeof budgetUpdateSchema>;
