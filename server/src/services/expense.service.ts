import { and, count, desc, eq, gt, gte, like, lte, sum } from 'drizzle-orm';

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
import { Category } from '@/db/tables/enums/category.enum';
import { convertObjectsToCsv } from '@/utils/convert-objects-to-csv';
import { ExportExpenses } from '@/validators/main/expense/export/request.schema';

export class ExpenseService {
  private readonly database = db;
  private readonly table = expenseTable;

  private readonly convertObjectsToCsv = convertObjectsToCsv;

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

  /**
   * Paginated query with optional filters (search, category, date range).
   * Filters are built dynamically — only non-null params generate WHERE clauses.
   * Runs the data query and total count in parallel for efficiency.
   */
  public async getAllByUserId(
    userId: string,
    pagination: GetAllExpenses,
  ): Promise<GetAllExpensesResponse> {
    const { page, pageSize, search, category, endDate, startDate } = pagination;

    const conditions = [eq(this.table.userId, userId)];

    if (search) {
      conditions.push(like(this.table.note, `%${search}%`));
    }

    if (category) {
      conditions.push(eq(this.table.category, category));
    }

    if (startDate) {
      conditions.push(gte(this.table.expenseDate, startDate));
    }

    if (endDate) {
      conditions.push(lte(this.table.expenseDate, endDate));
    }

    const whereClause = and(...conditions);

    const [expenses, totalResult] = await Promise.all([
      this.database
        .select()
        .from(this.table)
        .where(whereClause)
        .orderBy(desc(this.table.expenseDate))
        .limit(pageSize)
        .offset((page - 1) * pageSize),

      this.database
        .select({
          count: count(),
        })
        .from(this.table)
        .where(whereClause)
        .then((res) => res[0].count ?? 0),
    ]);

    return {
      data: expenses,

      total: totalResult,

      page,

      pageSize,

      totalPages: Math.ceil(totalResult / pageSize),
    };
  }

  public async delete(id: string): Promise<void> {
    await this.database.delete(this.table).where(eq(this.table.id, id));
  }

  /**
   * Ownership check: ensures the expense exists AND belongs to the given user.
   * Used before update/delete operations to prevent unauthorized access.
   */
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

  /**
   * Dashboard summary: computes aggregate stats (total, count, highest, most-used)
   * from all expenses in-memory. Acceptable for moderate data volumes; consider
   * SQL aggregation if datasets grow large.
   */
  public async getSummaryByUserId(
    userId: string,
  ): Promise<GetExpenseSummaryResponse> {
    const expenses = await this.getAllWithAmountAndCategoryByUserId(userId);

    return {
      totalExpenses: this.calculateTotalExpenses(expenses),

      totalTransactions: expenses.length,

      mostUsedCategory: this.calculateMostUsedCategory(expenses),

      highestExpense: this.calculateHighestExpense(expenses),
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

  /**
   * Groups expenses by month/year for the spending trend chart.
   * Aggregation is done in JS to avoid complex SQL date functions on SQLite.
   */
  public async getMonthlyTrendByUserId(
    userId: string,
  ): Promise<GetMonthlyTrendResponse> {
    const expenses = await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.userId, userId));

    const monthlyMap = new Map<
      string,
      {
        month: number;
        year: number;
        total: number;
      }
    >();

    for (const expense of expenses) {
      const date = new Date(expense.expenseDate);

      const month = date.getMonth() + 1;

      const year = date.getFullYear();

      const key = `${year}-${month}`;

      const existing = monthlyMap.get(key);

      monthlyMap.set(key, {
        month,
        year,
        total: (existing?.total ?? 0) + expense.amount,
      });
    }

    return Array.from(monthlyMap.values()).sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }

      return a.year - b.year;
    });
  }

  public async getTotalSpentByUserId(
    userId: string,
    data: { startDate: Date; endDate: Date },
  ): Promise<{ category: Category; spent: number }[]> {
    const { startDate, endDate } = data;

    const totalSpents = await this.database
      .select({
        category: this.table.category,
        spent: sum(this.table.amount),
      })
      .from(this.table)
      .where(
        and(
          eq(this.table.userId, userId),
          gte(this.table.expenseDate, startDate),
          lte(this.table.expenseDate, endDate),
        ),
      )
      .groupBy(this.table.category);

    return totalSpents.map((item) => ({
      category: item.category,

      spent: Number(item.spent ?? 0),
    }));
  }

  /** Export expenses as CSV, omitting internal IDs (id, userId) */
  public async exportToCsvByUserId(
    userId: string,
    data: ExportExpenses,
  ): Promise<string> {
    const expenses = await this.getAllByUserIdWithoutPagination(userId, data);

    return this.convertObjectsToCsv(expenses, ['id', 'userId']);
  }

  private async getAllByUserIdWithoutPagination(
    userId: string,
    data: ExportExpenses,
  ): Promise<Expense[]> {
    const { search, category, startDate, endDate } = data;

    const conditions = [eq(this.table.userId, userId)];

    if (search) conditions.push(like(this.table.note, `%${search}%`));
    if (category) conditions.push(eq(this.table.category, category));
    if (startDate) conditions.push(gte(this.table.expenseDate, startDate));
    if (endDate) conditions.push(lte(this.table.expenseDate, endDate));

    return await this.database
      .select()
      .from(this.table)
      .where(and(...conditions))
      .orderBy(desc(this.table.expenseDate));
  }

  private async getAllWithAmountAndCategoryByUserId(
    userId: string,
  ): Promise<Pick<Expense, 'amount' | 'category'>[]> {
    return await this.database
      .select({ amount: this.table.amount, category: this.table.category })
      .from(this.table)
      .where(eq(this.table.userId, userId));
  }

  private calculateTotalExpenses(expenses: Pick<Expense, 'amount'>[]): number {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }

  private calculateHighestExpense(
    expenses: Pick<Expense, 'category' | 'amount'>[],
  ): Pick<Expense, 'category' | 'amount'> | null {
    if (expenses.length === 0) {
      return null;
    }

    const highestExpense = expenses.reduce(
      (max, expense) => (expense.amount > max.amount ? expense : max),
      expenses[0],
    );

    return {
      amount: highestExpense.amount,
      category: highestExpense.category,
    };
  }

  private calculateMostUsedCategory(
    expenses: Pick<Expense, 'category'>[],
  ): Category | null {
    if (expenses.length === 0) {
      return null;
    }

    const categoryCountMap = new Map<Category, number>();

    for (const expense of expenses) {
      categoryCountMap.set(
        expense.category,

        (categoryCountMap.get(expense.category) ?? 0) + 1,
      );
    }

    let mostUsedCategory: Category | null = null;

    let maxCount = 0;

    for (const [category, count] of categoryCountMap) {
      if (count > maxCount) {
        maxCount = count;

        mostUsedCategory = category;
      }
    }

    return mostUsedCategory;
  }
}

export const expenseService = new ExpenseService();
