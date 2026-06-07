import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { clearDb } from './helpers/db-helper';

import { app } from '../src/app';

describe('API Routes Integration Tests', () => {
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

  describe('POST /auth/register and POST /auth/login', () => {
    it('should register a user, login successfully, and fetch user by ID', async () => {
      const registerPayload = {
        name: 'Integration Test User',
        email: 'integration@example.com',
        password: 'Password123!',
      };

      // 1. Register
      const registerRes = await request(app)
        .post('/auth/register')
        .send(registerPayload);

      expect(registerRes.status).toBe(201);
      expect(registerRes.body.user).toBeDefined();
      expect(registerRes.body.user.email).toBe(registerPayload.email.toLowerCase());
      expect(registerRes.body.tokens).toBeDefined();
      expect(registerRes.body.tokens.accessToken).toBeDefined();

      const userId = registerRes.body.user.id;

      // 2. Login
      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email: registerPayload.email,
          password: registerPayload.password,
        });

      expect(loginRes.status).toBe(202); // ACCEPTED is status 202
      expect(loginRes.body.tokens.accessToken).toBeDefined();

      // 3. Fetch user by ID
      const getUserRes = await request(app).get(`/user/${userId}`);
      expect(getUserRes.status).toBe(200);
      expect(getUserRes.body.email).toBe(registerPayload.email.toLowerCase());
      expect(getUserRes.body.password).toBeUndefined(); // Verify password field is omitted
    });

    it('should reject register with invalid payload (missing email)', async () => {
      const invalidPayload = {
        name: 'Invalid User',
        password: 'Password123!',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(invalidPayload);

      expect(res.status).toBe(400); // Bad Request (Zod validation failure)
    });
  });
});
