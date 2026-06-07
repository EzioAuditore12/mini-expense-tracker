import { db, sqlite } from '../../src/db';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database schema
migrate(db, {
  migrationsFolder: path.join(__dirname, '../../src/db/migrations'),
});

export function clearDb() {
  sqlite.exec('DELETE FROM blacklisted_refresh_token');
  sqlite.exec('DELETE FROM expense');
  sqlite.exec('DELETE FROM budget');
  sqlite.exec('DELETE FROM user');
}
