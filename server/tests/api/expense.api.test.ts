import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { clearDb } from '../helpers/db-helper';
import { app } from '../../src/app';

describe('Expense API Endpoints', () => {
  beforeEach(() => {
    clearDb();
  });

  let token: string;

  beforeEach(async () => {
    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        name: 'Expense User',
        email: 'expense_api@example.com',
        password: 'Password123!',
      });
    token = registerRes.body.tokens.accessToken;
  });

  it('should create, retrieve, update, list, and delete an expense', async () => {
    // 1. Create Expense
    const createRes = await request(app)
      .post('/expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 50,
        category: 'FOOD',
        note: 'Dinner with friends',
        expenseDate: new Date('2026-06-01T19:00:00Z').toISOString(),
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.id).toBeDefined();
    expect(createRes.body.amount).toBe(50);
    expect(createRes.body.category).toBe('FOOD');
    expect(createRes.body.note).toBe('Dinner with friends');

    const expenseId = createRes.body.id;

    // 2. Get Single Expense (Public route)
    const getRes = await request(app).get(`/expense/${expenseId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(expenseId);
    expect(getRes.body.amount).toBe(50);

    // 3. Update Expense
    const updateRes = await request(app)
      .patch(`/expense/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 60,
        note: 'Dinner with friends (inc tip)',
      });

    expect(updateRes.status).toBe(202);
    expect(updateRes.body.amount).toBe(60);
    expect(updateRes.body.note).toBe('Dinner with friends (inc tip)');

    // 4. List Expenses (getAllByUserId)
    const listRes = await request(app)
      .get('/expense')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, pageSize: 10 });

    expect(listRes.status).toBe(202);
    expect(listRes.body.data).toHaveLength(1);
    expect(listRes.body.total).toBe(1);

    // 5. Delete Expense
    const deleteRes = await request(app)
      .delete(`/expense/${expenseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(202);
    expect(deleteRes.body.message).toContain('deleted successfully');

    // Verify deleted
    const checkRes = await request(app).get(`/expense/${expenseId}`);
    expect(checkRes.status).toBe(404);
  });

  it('should retrieve summaries, trend and CSV export', async () => {
    // Create a couple of expenses first
    await request(app)
      .post('/expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 30,
        category: 'FOOD',
        note: 'Lunch',
        expenseDate: new Date('2026-06-01T12:00:00Z').toISOString(),
      });

    await request(app)
      .post('/expense')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 70,
        category: 'SHOPPING',
        note: 'Clothes',
        expenseDate: new Date('2026-06-03T12:00:00Z').toISOString(),
      });

    // 1. Get summary
    const summaryRes = await request(app)
      .get('/expense/summary')
      .set('Authorization', `Bearer ${token}`)
      .query({ month: 6, year: 2026 });

    expect(summaryRes.status).toBe(200);
    expect(summaryRes.body.totalExpenses).toBe(100);
    expect(summaryRes.body.totalTransactions).toBe(2);

    // 2. Get category summary
    const catSummaryRes = await request(app)
      .get('/expense/category-summary')
      .set('Authorization', `Bearer ${token}`)
      .query({ month: 6, year: 2026 });

    expect(catSummaryRes.status).toBe(200);
    expect(catSummaryRes.body).toHaveLength(2);

    // 3. Get monthly trend
    const trendRes = await request(app)
      .get('/expense/monthly-trend')
      .set('Authorization', `Bearer ${token}`)
      .query({ year: 2026 });

    expect(trendRes.status).toBe(200);
    expect(trendRes.body).toHaveLength(1);
    expect(trendRes.body[0].total).toBe(100);

    // 4. Export CSV
    const exportRes = await request(app)
      .get('/expense/export')
      .set('Authorization', `Bearer ${token}`)
      .query({});

    expect(exportRes.status).toBe(200);
    expect(exportRes.headers['content-type']).toContain('text/csv');
    expect(exportRes.text).toContain('FOOD');
    expect(exportRes.text).toContain('SHOPPING');
  });
});
