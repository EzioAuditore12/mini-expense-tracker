import { describe, it, expect, beforeEach } from 'vitest';
import { clearDb } from '../helpers/db-helper';
import { expenseService } from '../../src/services/expense.service';
import { userService } from '../../src/services/user.service';

describe('ExpenseService', () => {
  let userId: string;

  beforeEach(async () => {
    clearDb();

    // Create a default user for tests
    const user = await userService.create({
      name: 'Expense User',
      email: 'expense@example.com',
      password: 'password123',
    });
    userId = user.id;
  });

  describe('create', () => {
    it('should create an expense successfully', async () => {
      const expenseData = {
        userId,
        amount: 25.5,
        category: 'FOOD' as const,
        note: 'Pizza night',
        expenseDate: new Date('2026-06-05T18:00:00Z'),
      };

      const expense = await expenseService.create(expenseData);

      expect(expense).toBeDefined();
      expect(expense.id).toBeDefined();
      expect(expense.userId).toBe(userId);
      expect(expense.amount).toBe(25.5);
      expect(expense.category).toBe('FOOD');
      expect(expense.note).toBe('Pizza night');
      expect(expense.expenseDate).toBeInstanceOf(Date);
      expect(expense.createdAt).toBeInstanceOf(Date);
      expect(expense.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('should update an existing expense', async () => {
      const expense = await expenseService.create({
        userId,
        amount: 50,
        category: 'TRANSPORT',
        note: 'Taxi ride',
        expenseDate: new Date('2026-06-01T10:00:00Z'),
      });

      const updated = await expenseService.update(expense.id, {
        amount: 55.5,
        note: 'Taxi ride with tip',
      });

      expect(updated).toBeDefined();
      expect(updated.id).toBe(expense.id);
      expect(updated.amount).toBe(55.5);
      expect(updated.note).toBe('Taxi ride with tip');
      expect(updated.category).toBe('TRANSPORT'); // unchanged
    });
  });

  describe('findOne', () => {
    it('should retrieve an expense by ID', async () => {
      const expense = await expenseService.create({
        userId,
        amount: 10,
        category: 'ENTERTAINMENT',
        note: 'Movie',
        expenseDate: new Date('2026-06-02T20:00:00Z'),
      });

      const found = await expenseService.findOne(expense.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(expense.id);
      expect(found?.note).toBe('Movie');
    });

    it('should return null if expense ID does not exist', async () => {
      const found = await expenseService.findOne('non-existent');
      expect(found).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete an expense successfully', async () => {
      const expense = await expenseService.create({
        userId,
        amount: 10,
        category: 'ENTERTAINMENT',
        expenseDate: new Date(),
      });

      await expenseService.delete(expense.id);

      const found = await expenseService.findOne(expense.id);
      expect(found).toBeNull();
    });
  });

  describe('isCreatorAndExisting', () => {
    it('should return true if expense exists and belongs to the user', async () => {
      const expense = await expenseService.create({
        userId,
        amount: 200,
        category: 'SHOPPING',
        expenseDate: new Date(),
      });

      const isOwner = await expenseService.isCreatorAndExisting(
        userId,
        expense.id,
      );
      expect(isOwner).toBe(true);
    });

    it('should return false if expense belongs to another user', async () => {
      const otherUser = await userService.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
      });

      const expense = await expenseService.create({
        userId: otherUser.id,
        amount: 200,
        category: 'SHOPPING',
        expenseDate: new Date(),
      });

      const isOwner = await expenseService.isCreatorAndExisting(
        userId,
        expense.id,
      );
      expect(isOwner).toBe(false);
    });

    it('should return false if expense does not exist', async () => {
      const isOwner = await expenseService.isCreatorAndExisting(
        userId,
        'non-existent',
      );
      expect(isOwner).toBe(false);
    });
  });

  describe('getAllByUserId', () => {
    it('should return paginated results', async () => {
      await expenseService.create({
        userId,
        amount: 10,
        category: 'FOOD',
        expenseDate: new Date('2026-06-01'),
      });
      await expenseService.create({
        userId,
        amount: 20,
        category: 'TRANSPORT',
        expenseDate: new Date('2026-06-02'),
      });
      await expenseService.create({
        userId,
        amount: 30,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-03'),
      });

      const result = await expenseService.getAllByUserId(userId, {
        page: 1,
        pageSize: 2,
      });
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.totalPages).toBe(2);
    });

    it('should filter by search note, category, and date range', async () => {
      await expenseService.create({
        userId,
        amount: 15,
        category: 'FOOD',
        note: 'Supermarket shopping',
        expenseDate: new Date('2026-06-01T12:00:00Z'),
      });
      await expenseService.create({
        userId,
        amount: 45,
        category: 'SHOPPING',
        note: 'Weekly grocery bills',
        expenseDate: new Date('2026-06-03T12:00:00Z'),
      });
      await expenseService.create({
        userId,
        amount: 100,
        category: 'TRAVEL',
        note: 'Flight ticket',
        expenseDate: new Date('2026-06-10T12:00:00Z'),
      });

      // Filter by search note
      let result = await expenseService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        search: 'grocery',
      });
      expect(result.total).toBe(1);
      expect(result.data[0].category).toBe('SHOPPING');

      // Filter by category
      result = await expenseService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        category: 'FOOD',
      });
      expect(result.total).toBe(1);
      expect(result.data[0].note).toBe('Supermarket shopping');

      // Filter by date range
      result = await expenseService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        startDate: new Date('2026-06-02T00:00:00Z'),
        endDate: new Date('2026-06-05T23:59:59Z'),
      });
      expect(result.total).toBe(1);
      expect(result.data[0].category).toBe('SHOPPING');
    });
  });

  describe('getSummaryByUserId', () => {
    it('should calculate total expense summary correctly', async () => {
      await expenseService.create({
        userId,
        amount: 20,
        category: 'FOOD',
        expenseDate: new Date('2026-06-01'),
      });
      await expenseService.create({
        userId,
        amount: 50,
        category: 'TRANSPORT',
        expenseDate: new Date('2026-06-02'),
      });
      await expenseService.create({
        userId,
        amount: 20,
        category: 'FOOD',
        expenseDate: new Date('2026-06-03'),
      });

      const summary = await expenseService.getSummaryByUserId(userId);
      expect(summary.totalExpenses).toBe(90);
      expect(summary.totalTransactions).toBe(3);
      expect(summary.mostUsedCategory).toBe('FOOD');
      expect(summary.highestExpense).toEqual({
        amount: 50,
        category: 'TRANSPORT',
      });
    });

    it('should filter summary by month and year', async () => {
      await expenseService.create({
        userId,
        amount: 30,
        category: 'FOOD',
        expenseDate: new Date('2026-05-15T12:00:00Z'),
      });
      await expenseService.create({
        userId,
        amount: 70,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-05T12:00:00Z'),
      });

      const summaryJune = await expenseService.getSummaryByUserId(userId, {
        month: 6,
        year: 2026,
      });
      expect(summaryJune.totalExpenses).toBe(70);
      expect(summaryJune.totalTransactions).toBe(1);
      expect(summaryJune.mostUsedCategory).toBe('SHOPPING');
    });
  });

  describe('getCategorySummaryByUserId', () => {
    it('should aggregate amounts by category', async () => {
      await expenseService.create({
        userId,
        amount: 10,
        category: 'FOOD',
        expenseDate: new Date('2026-06-01'),
      });
      await expenseService.create({
        userId,
        amount: 30,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-02'),
      });
      await expenseService.create({
        userId,
        amount: 15,
        category: 'FOOD',
        expenseDate: new Date('2026-06-03'),
      });

      const categorySummary =
        await expenseService.getCategorySummaryByUserId(userId);
      expect(categorySummary).toHaveLength(2);

      //@ts-ignore
      const food = categorySummary.find((c) => c.category === 'FOOD');

      //@ts-ignore
      const shopping = categorySummary.find((c) => c.category === 'SHOPPING');

      expect(food?.total).toBe(25);
      expect(shopping?.total).toBe(30);
    });

    it('should filter category summary by month and year', async () => {
      await expenseService.create({
        userId,
        amount: 10,
        category: 'FOOD',
        expenseDate: new Date('2026-05-01'),
      });
      await expenseService.create({
        userId,
        amount: 30,
        category: 'FOOD',
        expenseDate: new Date('2026-06-02'),
      });

      const summaryJune = await expenseService.getCategorySummaryByUserId(
        userId,
        { month: 6, year: 2026 },
      );
      expect(summaryJune).toHaveLength(1);
      expect(summaryJune[0].total).toBe(30);
    });
  });

  describe('getMonthlyTrendByUserId', () => {
    it('should return aggregated expenses sorted chronologically by month and year', async () => {
      await expenseService.create({
        userId,
        amount: 50,
        category: 'FOOD',
        expenseDate: new Date('2026-02-15'),
      });
      await expenseService.create({
        userId,
        amount: 120,
        category: 'SHOPPING',
        expenseDate: new Date('2026-01-20'),
      });
      await expenseService.create({
        userId,
        amount: 80,
        category: 'TRANSPORT',
        expenseDate: new Date('2026-02-10'),
      });
      await expenseService.create({
        userId,
        amount: 200,
        category: 'BILLS',
        expenseDate: new Date('2025-12-05'),
      });

      // Without year filter
      const trends = await expenseService.getMonthlyTrendByUserId(userId);
      expect(trends).toHaveLength(3);

      // Verify chronological order: Dec 2025 -> Jan 2026 -> Feb 2026
      expect(trends[0]).toEqual({ year: 2025, month: 12, total: 200 });
      expect(trends[1]).toEqual({ year: 2026, month: 1, total: 120 });
      expect(trends[2]).toEqual({ year: 2026, month: 2, total: 130 }); // 50 + 80
    });

    it('should filter monthly trend by year', async () => {
      await expenseService.create({
        userId,
        amount: 50,
        category: 'FOOD',
        expenseDate: new Date('2026-02-15'),
      });
      await expenseService.create({
        userId,
        amount: 200,
        category: 'BILLS',
        expenseDate: new Date('2025-12-05'),
      });

      const trends2026 = await expenseService.getMonthlyTrendByUserId(userId, {
        year: 2026,
      });
      expect(trends2026).toHaveLength(1);
      expect(trends2026[0]).toEqual({ year: 2026, month: 2, total: 50 });
    });
  });

  describe('getTotalSpentByUserId', () => {
    it('should return spent amounts per category in a specific date range', async () => {
      await expenseService.create({
        userId,
        amount: 40,
        category: 'FOOD',
        expenseDate: new Date('2026-06-01T10:00:00Z'),
      });
      await expenseService.create({
        userId,
        amount: 60,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-03T10:00:00Z'),
      });
      await expenseService.create({
        userId,
        amount: 100,
        category: 'FOOD',
        expenseDate: new Date('2026-06-10T10:00:00Z'),
      });

      const result = await expenseService.getTotalSpentByUserId(userId, {
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-06-05T23:59:59Z'),
      });

      expect(result).toHaveLength(2);
      const food = result.find((r) => r.category === 'FOOD');
      const shopping = result.find((r) => r.category === 'SHOPPING');
      expect(food?.spent).toBe(40);
      expect(shopping?.spent).toBe(60);
    });
  });

  describe('exportToCsvByUserId', () => {
    it('should return CSV data representing expenses with specified internal fields omitted', async () => {
      await expenseService.create({
        userId,
        amount: 25.5,
        category: 'FOOD',
        note: 'Pizza night',
        expenseDate: new Date('2026-06-05T18:00:00Z'),
      });

      const csv = await expenseService.exportToCsvByUserId(userId, {});
      expect(csv).toBeDefined();

      // Check CSV headers (should not contain id or userId)
      expect(csv).toContain('amount');
      expect(csv).toContain('category');
      expect(csv).toContain('note');
      expect(csv).toContain('expense_date');

      expect(csv).not.toContain('userId');
      expect(csv).not.toMatch(/^id\b/m); // No id column as a standalone word in the CSV headers

      // Check CSV content
      expect(csv).toContain('25.5');
      expect(csv).toContain('FOOD');
      expect(csv).toContain('Pizza night');
    });
  });
});
