import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type { Database as BetterSqlite3Database } from 'better-sqlite3';

import { env } from '@/env';

const dbPath = env.isTest
  ? `./test-${process.env.VITEST_WORKER_ID || 'main'}.db`
  : env.DB_PATH;

export const sqlite: BetterSqlite3Database = new Database(dbPath);

export const db = drizzle({ client: sqlite });
