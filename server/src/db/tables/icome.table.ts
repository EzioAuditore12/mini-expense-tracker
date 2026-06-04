import {
  sqliteTable,
  text,
  real,
  integer,
  index,
} from 'drizzle-orm/sqlite-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { SnowFlakeId } from '@/utils/snowflake';

import { userTable } from './user.table';
import { incomeSourceEnum } from './enums/icome-source.enum';

export const INCOME_TABLE_NAME = 'income';

export const incomeTable = sqliteTable(
  INCOME_TABLE_NAME,
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate().toString()),

    userId: text('user_id')
      .references(() => userTable.id, { onDelete: 'cascade' })
      .notNull(),

    amount: real('amount').default(0).notNull(),

    source: text('source', {
      enum: incomeSourceEnum,
    }).notNull(),

    note: text('note'),

    incomeDate: integer('income_date', { mode: 'timestamp' }).notNull(),

    createdAt: integer('created_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [index('income_user_id_idx').on(t.userId)],
);

export const incomeSchema = createSelectSchema(incomeTable);

export const insertIncomeSchema = createInsertSchema(incomeTable, {
  amount: z.number().positive('Income amount must be greater than 0'),
  incomeDate: z.coerce
    .date()
    .max(new Date(), { message: 'Date cannot be in the future' }),
});

export type Income = z.infer<typeof incomeSchema>;
