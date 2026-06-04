import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { SnowFlakeId } from '@/utils/snowflake';

export const BLACKLISTED_REFRESH_TOKEN_TABLE_NAME = 'blacklisted_refresh_token';

export const blackListedRefreshTokenTable = sqliteTable(
  BLACKLISTED_REFRESH_TOKEN_TABLE_NAME,
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate().toString()),

    refreshToken: text('refresh_token').notNull(),

    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),

    expiredAt: integer('expired_at', { mode: 'timestamp' }).notNull(),
  },
);
