import { describe, it, expect, beforeEach } from 'vitest';
import { clearDb } from '../helpers/db-helper';

import { authService } from '../../src/services/auth.service';
import { userService } from '../../src/services/user.service';
import { ConflictError, NotFoundError, UnauthenticatedError } from 'express-error-toolkit';

describe('AuthService', () => {
  beforeEach(() => {
    clearDb();
  });

  describe('register', () => {
    it('should register a new user successfully and return tokens', async () => {
      const registerData = {
        name: 'Alice Cooper',
        email: 'alice@example.com',
        password: 'Password123!',
      };

      const result = await authService.register(registerData);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.name).toBe(registerData.name);
      expect(result.user.email).toBe(registerData.email);
      expect(result.user.id).toBeDefined();
      expect(result.tokens).toBeDefined();
      expect(result.tokens.accessToken).toBeDefined();
      expect(result.tokens.refreshToken).toBeDefined();

      // Verify user is in DB
      const dbUser = await userService.findByEmail(registerData.email);
      expect(dbUser).toBeDefined();
      expect(dbUser?.name).toBe(registerData.name);
    });

    it('should throw ConflictError if email is already taken', async () => {
      const registerData = {
        name: 'Alice Cooper',
        email: 'alice@example.com',
        password: 'Password123!',
      };

      await authService.register(registerData);

      await expect(authService.register(registerData)).rejects.toThrow(ConflictError);
    });
  });

  describe('login', () => {
    it('should login an existing user successfully with correct credentials', async () => {
      const registerData = {
        name: 'Bob Marley',
        email: 'bob@example.com',
        password: 'Password123!',
      };

      await authService.register(registerData);

      const loginResult = await authService.login({
        email: registerData.email,
        password: registerData.password,
      });

      expect(loginResult).toBeDefined();
      expect(loginResult.user.email).toBe(registerData.email);
      expect(loginResult.tokens.accessToken).toBeDefined();
      expect(loginResult.tokens.refreshToken).toBeDefined();
    });

    it('should throw NotFoundError if user email does not exist', async () => {
      await expect(
        authService.login({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        })
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw UnauthenticatedError if password is incorrect', async () => {
      const registerData = {
        name: 'Bob Marley',
        email: 'bob@example.com',
        password: 'Password123!',
      };

      await authService.register(registerData);

      await expect(
        authService.login({
          email: registerData.email,
          password: 'wrongpassword',
        })
      ).rejects.toThrow(UnauthenticatedError);
    });
  });

  describe('refresh', () => {
    it('should issue new tokens when a valid refresh token is provided', async () => {
      const registerData = {
        name: 'Charlie Chaplin',
        email: 'charlie@example.com',
        password: 'Password123!',
      };

      const registerResult = await authService.register(registerData);
      const { refreshToken } = registerResult.tokens;

      const refreshResult = await authService.refresh(refreshToken);

      expect(refreshResult).toBeDefined();
      expect(refreshResult.accessToken).toBeDefined();
      expect(refreshResult.refreshToken).toBeDefined();
      expect(refreshResult.refreshToken).not.toBe(refreshToken); // Token rotated!
    });

    it('should throw UnauthenticatedError if the refresh token is blacklisted', async () => {
      const registerData = {
        name: 'Charlie Chaplin',
        email: 'charlie@example.com',
        password: 'Password123!',
      };

      const registerResult = await authService.register(registerData);
      const { refreshToken } = registerResult.tokens;

      // Use it once (which blacklists it)
      await authService.refresh(refreshToken);

      // Try using it again (replay attack)
      await expect(authService.refresh(refreshToken)).rejects.toThrow(UnauthenticatedError);
    });
  });
});
