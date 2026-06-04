import {
  sqliteTable,
  text,
  real,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

import { userTable } from './user.table';
import { categoryEnum } from './enums/category.enum';

export const BUDGET_TABLE_NAME = 'budget';

export const budgetTable = sqliteTable(
  BUDGET_TABLE_NAME,
  {
    id: text('id').primaryKey(),

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
  },
  (t) => [
    uniqueIndex('budget_unique_idx').on(t.userId, t.category, t.month, t.year),
  ],
);
