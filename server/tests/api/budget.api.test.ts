import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { clearDb } from '../helpers/db-helper';
import { app } from '../../src/app';

describe('Budget API Endpoints', () => {
  beforeEach(() => {
    clearDb();
  });

  let token: string;

  beforeEach(async () => {
    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        name: 'Budget User',
        email: 'budget_api@example.com',
        password: 'Password123!',
      });
    token = registerRes.body.tokens.accessToken;
  });

  it('should create, retrieve, update, list, and delete a budget', async () => {
    // 1. Create Budget
    const createRes = await request(app)
      .post('/budget')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'FOOD',
        limitAmount: 500,
        month: 6,
        year: 2026,
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.id).toBeDefined();
    expect(createRes.body.category).toBe('FOOD');
    expect(createRes.body.limitAmount).toBe(500);

    const budgetId = createRes.body.id;

    // 2. Get Single Budget (Public route)
    const getRes = await request(app).get(`/budget/${budgetId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(budgetId);
    expect(getRes.body.limitAmount).toBe(500);

    // 3. Update Budget
    const updateRes = await request(app)
      .patch(`/budget/${budgetId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        limitAmount: 600,
      });

    expect(updateRes.status).toBe(202);
    expect(updateRes.body.limitAmount).toBe(600);

    // 4. List Budgets (getAllByUserId)
    const listRes = await request(app)
      .get('/budget')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, pageSize: 10 });

    expect(listRes.status).toBe(202);
    expect(listRes.body.data).toHaveLength(1);
    expect(listRes.body.total).toBe(1);

    // 5. Delete Budget
    const deleteRes = await request(app)
      .delete(`/budget/${budgetId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(202);
    expect(deleteRes.body.message).toContain('deleted successfully');

    // Verify deleted
    const checkRes = await request(app).get(`/budget/${budgetId}`);
    expect(checkRes.status).toBe(404);
  });

  it('should return budget status summary', async () => {
    // 1. Create a budget
    await request(app)
      .post('/budget')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'FOOD',
        limitAmount: 200,
        month: 6,
        year: 2026,
      });

    // 2. Create an expense under FOOD in same period
    await request(app)
      .post('/expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 50,
        category: 'FOOD',
        note: 'Groceries',
        expenseDate: new Date('2026-06-05T12:00:00Z').toISOString(),
      });

    // 3. Fetch budget status summary
    const statusRes = await request(app)
      .get('/budget/summary')
      .set('Authorization', `Bearer ${token}`)
      .query({ month: 6, year: 2026 });

    expect(statusRes.status).toBe(200);
    expect(statusRes.body).toHaveLength(1);
    expect(statusRes.body[0].category).toBe('FOOD');
    expect(statusRes.body[0].spent).toBe(50);
    expect(statusRes.body[0].limitAmount).toBe(200);
    expect(statusRes.body[0].remaining).toBe(150);
    expect(statusRes.body[0].percentage).toBe(25);
    expect(statusRes.body[0].status).toBe('ON_TRACK');
  });
});
