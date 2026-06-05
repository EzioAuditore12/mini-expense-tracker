import { and, count, desc, eq, ne, sum } from 'drizzle-orm';

import { db } from '@/db';
import {
  budgetTable,
  type Budget,
  type BudgetInsert,
  type BudgetUpdate,
} from '@/db/tables/budget.table';

import type { GetAllBudgets } from '@/validators/main/budget/get-all/request';
import type { GetAllBudgetsResponse } from '@/validators/main/budget/get-all/response';
import { Category } from '@/db/tables/enums/category.enum';
import { expenseService } from './expense.service';
import {
  BudgetStatusEnum,
  BudgetStatusResponse,
} from '@/validators/main/budget/status/response.schema';

export class BudgetService {
  private readonly database = db;
  private readonly table = budgetTable;

  private readonly expenseService = expenseService;

  public async create(insertBudget: BudgetInsert): Promise<Budget> {
    return await this.database
      .insert(this.table)
      .values(insertBudget)
      .returning()
      .then((res) => res[0]);
  }

  public async update(
    id: string,
    budgetUpdate: Omit<BudgetUpdate, 'id'>,
  ): Promise<Budget> {
    return await this.database
      .update(this.table)
      .set(budgetUpdate)
      .where(eq(this.table.id, id))
      .returning()
      .then((res) => res[0]);
  }

  public async findOne(id: string): Promise<Budget | null> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .then((res) => (res.length > 0 ? res[0] : null));
  }

  public async delete(id: string): Promise<void> {
    await this.database.delete(this.table).where(eq(this.table.id, id));
  }

  public async isCreatorAndExisting(
    userId: string,
    budgetId: string,
  ): Promise<boolean> {
    const id = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(and(eq(this.table.id, budgetId), eq(this.table.userId, userId)))
      .then((res) => (res.length > 0 ? res[0].id : null));

    return !!id;
  }

  public async getAllByUserId(
    userId: string,
    pagination: GetAllBudgets,
  ): Promise<GetAllBudgetsResponse> {
    const { page, pageSize, category, month, year } = pagination;

    const conditions = [eq(this.table.userId, userId)];

    if (category) {
      conditions.push(eq(this.table.category, category));
    }

    if (month !== undefined && month !== null) {
      conditions.push(eq(this.table.month, month));
    }

    if (year !== undefined && year !== null) {
      conditions.push(eq(this.table.year, year));
    }

    const whereClause = and(...conditions);

    const [budgets, totalResult] = await Promise.all([
      this.database
        .select()
        .from(this.table)
        .where(whereClause)
        .orderBy(desc(this.table.year), desc(this.table.month))
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
      data: budgets,
      total: totalResult,
      page,
      pageSize,
      totalPages: Math.ceil(totalResult / pageSize),
    };
  }

  public async checkUniqueConstraint(
    userId: string,
    category: Category,
    month: number,
    year: number,
    excludeId?: string,
  ): Promise<boolean> {
    const conditions = [
      eq(this.table.userId, userId),
      eq(this.table.category, category),
      eq(this.table.month, month),
      eq(this.table.year, year),
    ];

    if (excludeId) {
      conditions.push(ne(this.table.id, excludeId));
    }

    const existing = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(and(...conditions))
      .then((res) => res.length > 0);

    return existing;
  }

  public async getBudgetStatusByUserId(
    userId: string,
    month: number,
    year: number,
  ): Promise<BudgetStatusResponse> {
    const budgets = await this.getBudgetsByUserIdMonthAndYear(userId, {
      month,
      year,
    });

    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const expenseTotals = await this.expenseService.getTotalSpentByUserId(
      userId,
      { startDate, endDate },
    );

    return this.mapBudgetStatuses(budgets, expenseTotals);
  }

  private mapBudgetStatuses(
    budgets: Budget[],
    expenseTotals: {
      category: Category;
      spent: number;
    }[],
  ): BudgetStatusResponse {
    const expenseMap = new Map(
      expenseTotals.map((item) => [item.category, item.spent]),
    );

    return budgets.map((budget) => {
      const spent = expenseMap.get(budget.category) ?? 0;

      const remaining = budget.limitAmount - spent;

      const percentage =
        budget.limitAmount === 0
          ? 0
          : Math.round((spent / budget.limitAmount) * 100);

      const budgetStatus = this.setBudgetStatus(percentage);

      return {
        id: budget.id,
        category: budget.category,
        limitAmount: budget.limitAmount,
        spent,
        remaining,
        percentage,
        status: budgetStatus,
      };
    });
  }

  private setBudgetStatus(percentage: number): BudgetStatusEnum {
    let budgetStatus: BudgetStatusEnum;

    if (percentage >= 100) {
      budgetStatus = 'OVER_BUDGET';
    } else if (percentage >= 80) {
      budgetStatus = 'APPROACHING_LIMIT';
    } else {
      budgetStatus = 'ON_TRACK';
    }

    return budgetStatus;
  }

  private async getBudgetsByUserIdMonthAndYear(
    userId: string,
    data: Pick<Budget, 'month' | 'year'>,
  ): Promise<Budget[]> {
    const { month, year } = data;
    return await this.database
      .select()
      .from(this.table)
      .where(
        and(
          eq(this.table.userId, userId),
          eq(this.table.month, month),
          eq(this.table.year, year),
        ),
      );
  }
}

export const budgetService = new BudgetService();
