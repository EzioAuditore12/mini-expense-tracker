import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { clearDb } from '../helpers/db-helper';
import { app } from '../../src/app';

describe('Health & Root API Endpoints', () => {
  beforeEach(() => {
    clearDb();
  });

  describe('GET /', () => {
    it('should return 200 OK and HTML content', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Mini Expense Tracker API');
    });
  });

  describe('GET /health-check', () => {
    it('should return 200 OK and healthy status', async () => {
      const response = await request(app).get('/health-check');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Service is healthy');
    });
  });
});
