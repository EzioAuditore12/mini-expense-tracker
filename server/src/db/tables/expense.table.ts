import {
  sqliteTable,
  text,
  real,
  integer,
  index,
} from 'drizzle-orm/sqlite-core';
import { z } from 'zod';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { endOfToday } from 'date-fns';

import { SnowFlakeId } from '@/utils/snowflake';

import { userTable } from './user.table';
import { categoryEnum } from './enums/category.enum';

export const EXPENSE_TABLE_NAME = 'expense';

export const expenseTable = sqliteTable(
  EXPENSE_TABLE_NAME,
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate().toString()),

    userId: text('user_id')
      .references(() => userTable.id, { onDelete: 'cascade' })
      .notNull(),

    amount: real('amount').default(0).notNull(),

    category: text('category', {
      enum: categoryEnum,
    }).notNull(),

    note: text('note'),

    expenseDate: integer('expense_date', { mode: 'timestamp' }).notNull(),

    createdAt: integer('created_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index('expense_user_id_idx').on(t.userId),
    index('expense_expense_date_idx').on(t.expenseDate),
  ],
);

export const expenseSchema = createSelectSchema(expenseTable, {
  amount: z.number().positive(),
});

export const expenseInsertSchema = createInsertSchema(expenseTable, {
  amount: z.coerce.number().positive('Amount should be greater than 0'),

  expenseDate: z.coerce.date().refine((date) => date <= endOfToday(), {
    message: 'Expense date cannot be in the future',
  }),
});

export const expenseUpdateSchema = createUpdateSchema(expenseTable, {
  amount: z.coerce
    .number()
    .positive('Amount should be greater than 0')
    .optional(),

  expenseDate: z.coerce
    .date()
    .refine((date) => date <= endOfToday(), {
      message: 'Expense date cannot be in the future',
    })
    .optional(),
});

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseInsert = z.infer<typeof expenseInsertSchema>;
export type ExpenseUpdate = z.infer<typeof expenseUpdateSchema>;
