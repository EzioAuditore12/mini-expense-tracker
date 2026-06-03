import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { userTable, type InsertUser, type User } from '@/db/tables/user.table';

export class UserService {
  private readonly database = db;
  private readonly table = userTable;

  public async create(insertUser: InsertUser): Promise<User> {
    return await this.database
      .insert(this.table)
      .values(insertUser)
      .returning()
      .then((res) => res[0]);
  }

  public async findOne(id: string): Promise<User | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then((res) => (res.length > 0 ? res[0] : null));
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.email, email))
      .then((res) => (res.length > 0 ? res[0] : null));
  }
}

export const userService = new UserService();
