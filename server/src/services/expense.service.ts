import { and, asc, eq, gt, ilike } from 'drizzle-orm';

import { db } from '@/db';
import {
  expenseTable,
  type ExpenseUpdate,
  type Expense,
  type ExpenseInsert,
} from '@/db/tables/expense.table';

import type { Pagination } from '@/validators/main/pagination';

export class ExpenseService {
  private readonly database = db;
  private readonly table = expenseTable;

  public async create(insertExpense: ExpenseInsert): Promise<Expense> {
    return await this.database
      .insert(this.table)
      .values(insertExpense)
      .returning()
      .then((res) => res[0]);
  }

  public async update(
    id: string,
    expenseUpdate: Omit<ExpenseUpdate, 'id'>,
  ): Promise<Expense> {
    return await this.database
      .update(this.table)
      .set(expenseUpdate)
      .where(eq(this.table.id, id))
      .returning()
      .then((res) => res[0]);
  }

  public async findOne(id: string): Promise<Expense | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then((res) => (res.length > 0 ? res[0] : null));
  }

  public async getAllByUserId(
    userId: string,
    pagination: Pagination,
  ): Promise<Expense[]> {
    const { pageSize, cursor, search } = pagination;

    const conditions = [eq(this.table.userId, userId)];

    if (cursor) conditions.push(gt(this.table.id, cursor));

    if (search) conditions.push(ilike(this.table.category, `%${search}%`));

    return await this.database
      .select()
      .from(this.table)
      .where(and(...conditions))
      .orderBy(asc(this.table.id))
      .limit(pageSize);
  }

  public async delete(id: string): Promise<void> {
    await this.database.delete(this.table).where(eq(this.table.id, id));
  }

  public async isCreatorAndExisting(
    userId: string,
    expenseId: string,
  ): Promise<boolean> {
    const id = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(and(eq(this.table.id, expenseId), eq(this.table.userId, userId)))
      .then((res) => (res.length > 0 ? res[0].id : null));

    return !!id;
  }
}

export const expenseService = new ExpenseService();
