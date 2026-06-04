import { and, desc, eq, gt, gte, ilike, lte, sum } from 'drizzle-orm';

import { db } from '@/db';
import {
  expenseTable,
  type ExpenseUpdate,
  type Expense,
  type ExpenseInsert,
} from '@/db/tables/expense.table';

import type { GetAllExpenses } from '@/validators/main/expense/get-all/request';
import type { GetAllExpensesResponse } from '@/validators/main/expense/get-all/response';
import type { GetExpenseSummaryResponse } from '@/validators/main/expense/get-summary/response.schema';
import type { GetCategorySummaryResponse } from '@/validators/main/expense/get-category-summary/response.schema';
import type { GetMonthlyTrendResponse } from '@/validators/main/expense/get-monthly-trend/response.schema';

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
    pagination: GetAllExpenses,
  ): Promise<GetAllExpensesResponse> {
    const { pageSize, cursor, search, category, endDate, startDate } =
      pagination;

    const conditions = [eq(this.table.userId, userId)];

    if (cursor) conditions.push(gt(this.table.id, cursor));

    if (search) conditions.push(ilike(this.table.note, `%${search}%`));

    if (category) conditions.push(eq(this.table.category, category));

    if (startDate) conditions.push(gte(this.table.expenseDate, startDate));

    if (endDate) conditions.push(lte(this.table.expenseDate, endDate));

    return await this.database
      .select()
      .from(this.table)
      .where(and(...conditions))
      .orderBy(desc(this.table.id))
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

  public async getSummaryByUserId(
    userId: string,
  ): Promise<GetExpenseSummaryResponse> {
    const expenses = await this.getAllWithAmountAndCategoryByUserId(userId);

    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );

    const highestExpense = expenses.reduce(
      (max, expense) => (expense.amount > max.amount ? expense : max),
      expenses[0],
    );

    return {
      totalExpenses,

      highestExpense: highestExpense
        ? {
            amount: highestExpense.amount,
            category: highestExpense.category,
          }
        : null,
    };
  }

  public async getCategorySummaryByUserId(
    userId: string,
  ): Promise<GetCategorySummaryResponse> {
    const result = await this.database
      .select({
        category: this.table.category,
        total: sum(this.table.amount),
      })
      .from(this.table)
      .where(eq(this.table.userId, userId))
      .groupBy(this.table.category);

    return result.map((item) => ({
      category: item.category,
      total: Number(item.total ?? 0),
    }));
  }

  public async getMonthlyTrendByUserId(
    userId: string,
  ): Promise<GetMonthlyTrendResponse> {
    const expenses = await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.userId, userId));

    const monthlyMap = new Map<string, number>();

    for (const expense of expenses) {
      const month = new Date(expense.expenseDate).toLocaleString('default', {
        month: 'short',
      });

      monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + expense.amount);
    }

    return Array.from(monthlyMap.entries()).map(([month, total]) => ({
      month,
      total,
    }));
  }

  private async getAllWithAmountAndCategoryByUserId(
    userId: string,
  ): Promise<Pick<Expense, 'amount' | 'category'>[]> {
    return await this.database
      .select({ amount: this.table.amount, category: this.table.category })
      .from(this.table)
      .where(eq(this.table.userId, userId));
  }
}

export const expenseService = new ExpenseService();
