import crypto from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const USER_TABLE_NAME = 'user';

export const userTable = sqliteTable(USER_TABLE_NAME, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text('name', { length: 100 }).notNull(),

  email: text('email', { length: 240 }).unique().notNull(),

  password: text('password').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const userSchema = createSelectSchema(userTable, {
  email: z
    .email()
    .max(240)
    .transform((val) => val.toLowerCase()),
});
export const publicUserSchema = userSchema.omit({ password: true });

export const insertUserSchema = createInsertSchema(userTable, {
  email: z
    .email()
    .max(240)
    .transform((val) => val.toLowerCase()),
});

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
