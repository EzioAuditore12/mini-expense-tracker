import { describe, it, expect, beforeEach } from 'vitest';
import { clearDb } from '../helpers/db-helper';
import { budgetService } from '../../src/services/budget.service';
import { userService } from '../../src/services/user.service';
import { expenseService } from '../../src/services/expense.service';

describe('BudgetService', () => {
  let userId: string;

  beforeEach(async () => {
    clearDb();

    // Create a default user for the tests
    const user = await userService.create({
      name: 'Budget User',
      email: 'budget@example.com',
      password: 'password123',
    });
    userId = user.id;
  });

  describe('create', () => {
    it('should create a budget successfully', async () => {
      const budgetData = {
        userId,
        category: 'FOOD' as const,
        limitAmount: 500.5,
        month: 6,
        year: 2026,
      };

      const budget = await budgetService.create(budgetData);

      expect(budget).toBeDefined();
      expect(budget.id).toBeDefined();
      expect(budget.userId).toBe(userId);
      expect(budget.category).toBe('FOOD');
      expect(budget.limitAmount).toBe(500.5);
      expect(budget.month).toBe(6);
      expect(budget.year).toBe(2026);
      expect(budget.createdAt).toBeInstanceOf(Date);
      expect(budget.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('update', () => {
    it('should update an existing budget limit, month, or year', async () => {
      const budget = await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 500,
        month: 6,
        year: 2026,
      });

      const updated = await budgetService.update(budget.id, {
        limitAmount: 600,
        month: 7,
      });

      expect(updated).toBeDefined();
      expect(updated.id).toBe(budget.id);
      expect(updated.limitAmount).toBe(600);
      expect(updated.month).toBe(7);
      expect(updated.year).toBe(2026); // remains unchanged
    });
  });

  describe('findOne', () => {
    it('should retrieve a budget by ID', async () => {
      const budget = await budgetService.create({
        userId,
        category: 'SHOPPING',
        limitAmount: 200,
        month: 6,
        year: 2026,
      });

      const found = await budgetService.findOne(budget.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(budget.id);
      expect(found?.category).toBe('SHOPPING');
    });

    it('should return null if budget ID does not exist', async () => {
      const found = await budgetService.findOne('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a budget successfully', async () => {
      const budget = await budgetService.create({
        userId,
        category: 'HEALTH',
        limitAmount: 150,
        month: 6,
        year: 2026,
      });

      await budgetService.delete(budget.id);

      const found = await budgetService.findOne(budget.id);
      expect(found).toBeNull();
    });
  });

  describe('isCreatorAndExisting', () => {
    it('should return true if budget exists and belongs to the user', async () => {
      const budget = await budgetService.create({
        userId,
        category: 'BILLS',
        limitAmount: 1000,
        month: 6,
        year: 2026,
      });

      const isOwner = await budgetService.isCreatorAndExisting(
        userId,
        budget.id,
      );
      expect(isOwner).toBe(true);
    });

    it('should return false if budget belongs to another user', async () => {
      const otherUser = await userService.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
      });

      const budget = await budgetService.create({
        userId: otherUser.id,
        category: 'BILLS',
        limitAmount: 1000,
        month: 6,
        year: 2026,
      });

      const isOwner = await budgetService.isCreatorAndExisting(
        userId,
        budget.id,
      );
      expect(isOwner).toBe(false);
    });

    it('should return false if budget does not exist', async () => {
      const isOwner = await budgetService.isCreatorAndExisting(
        userId,
        'non-existent',
      );
      expect(isOwner).toBe(false);
    });
  });

  describe('getAllByUserId', () => {
    it('should list all budgets for a user with pagination', async () => {
      // Create three budgets
      await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 100,
        month: 6,
        year: 2026,
      });
      await budgetService.create({
        userId,
        category: 'TRANSPORT',
        limitAmount: 200,
        month: 6,
        year: 2026,
      });
      await budgetService.create({
        userId,
        category: 'SHOPPING',
        limitAmount: 300,
        month: 7,
        year: 2026,
      });

      const result = await budgetService.getAllByUserId(userId, {
        page: 1,
        pageSize: 2,
      });
      expect(result.data.length).toBe(2);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(2);
      expect(result.totalPages).toBe(2);
    });

    it('should filter budgets by category, month, and year', async () => {
      await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 100,
        month: 6,
        year: 2026,
      });
      await budgetService.create({
        userId,
        category: 'TRANSPORT',
        limitAmount: 200,
        month: 6,
        year: 2026,
      });
      await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 300,
        month: 7,
        year: 2026,
      });

      // Filter by category
      let result = await budgetService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        category: 'FOOD',
      });
      expect(result.total).toBe(2);

      //@ts-ignore
      expect(result.data.every((b) => b.category === 'FOOD')).toBe(true);

      // Filter by month
      result = await budgetService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        month: 6,
      });
      expect(result.total).toBe(2);

      //@ts-ignore
      expect(result.data.every((b) => b.month === 6)).toBe(true);

      // Filter by year
      result = await budgetService.getAllByUserId(userId, {
        page: 1,
        pageSize: 10,
        year: 2026,
      });
      expect(result.total).toBe(3);
    });
  });

  describe('checkUniqueConstraint', () => {
    it('should return false if no budget with same constraints exists', async () => {
      const exists = await budgetService.checkUniqueConstraint(
        userId,
        'FOOD',
        6,
        2026,
      );
      expect(exists).toBe(false);
    });

    it('should return true if budget with same constraints already exists', async () => {
      await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 100,
        month: 6,
        year: 2026,
      });

      const exists = await budgetService.checkUniqueConstraint(
        userId,
        'FOOD',
        6,
        2026,
      );
      expect(exists).toBe(true);
    });

    it('should return false if budget exists but is excluded by ID', async () => {
      const budget = await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 100,
        month: 6,
        year: 2026,
      });

      const exists = await budgetService.checkUniqueConstraint(
        userId,
        'FOOD',
        6,
        2026,
        budget.id,
      );
      expect(exists).toBe(false);
    });
  });

  describe('getBudgetStatusByUserId', () => {
    it('should compute status and usage percentage relative to limits', async () => {
      // Create budgets for FOOD (limit 500) and SHOPPING (limit 200)
      await budgetService.create({
        userId,
        category: 'FOOD',
        limitAmount: 500,
        month: 6,
        year: 2026,
      });
      await budgetService.create({
        userId,
        category: 'SHOPPING',
        limitAmount: 200,
        month: 6,
        year: 2026,
      });

      // Create expenses:
      // Food expense 1: 150 (on Jun 10, 2026) -> total 150 (30% used) -> ON_TRACK
      await expenseService.create({
        userId,
        amount: 150,
        category: 'FOOD',
        expenseDate: new Date('2026-06-10T12:00:00Z'),
        note: 'lunch',
      });

      // Shopping expense 1: 170 (on Jun 15, 2026) -> total 170 (85% used) -> APPROACHING_LIMIT
      await expenseService.create({
        userId,
        amount: 170,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-15T12:00:00Z'),
        note: 'clothes',
      });

      // Shopping expense 2: 50 -> total 220 (110% used) -> OVER_BUDGET
      await expenseService.create({
        userId,
        amount: 50,
        category: 'SHOPPING',
        expenseDate: new Date('2026-06-16T12:00:00Z'),
        note: 'shoes',
      });

      const status = await budgetService.getBudgetStatusByUserId(
        userId,
        6,
        2026,
      );

      expect(status).toHaveLength(2);

      //@ts-ignore
      const foodStatus = status.find((s) => s.category === 'FOOD');
      //@ts-ignore
      const shoppingStatus = status.find((s) => s.category === 'SHOPPING');

      expect(foodStatus).toBeDefined();
      expect(foodStatus?.spent).toBe(150);
      expect(foodStatus?.remaining).toBe(350);
      expect(foodStatus?.percentage).toBe(30);
      expect(foodStatus?.status).toBe('ON_TRACK');

      expect(shoppingStatus).toBeDefined();
      expect(shoppingStatus?.spent).toBe(220);
      expect(shoppingStatus?.remaining).toBe(-20);
      expect(shoppingStatus?.percentage).toBe(110);
      expect(shoppingStatus?.status).toBe('OVER_BUDGET');
    });
  });
});
