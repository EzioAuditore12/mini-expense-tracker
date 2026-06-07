import { describe, it, expect, beforeEach } from 'vitest';
import { clearDb } from '../helpers/db-helper';
import { userService } from '../../src/services/user.service';

describe('UserService', () => {
  beforeEach(() => {
    clearDb();
  });

  it('should create a user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    };

    const user = await userService.create(userData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should find a user by ID', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'hashedpassword',
    };

    const createdUser = await userService.create(userData);
    const foundUser = await userService.findOne(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(createdUser.id);
    expect(foundUser?.name).toBe(userData.name);
    expect(foundUser?.email).toBe(userData.email);
  });

  it('should return null when user is not found by ID', async () => {
    const foundUser = await userService.findOne('non-existent-id');
    expect(foundUser).toBeNull();
  });

  it('should find a user by email', async () => {
    const userData = {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'hashedpassword',
    };

    const createdUser = await userService.create(userData);
    const foundUser = await userService.findByEmail(userData.email);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(createdUser.id);
    expect(foundUser?.email).toBe(userData.email);
  });

  it('should return null when user is not found by email', async () => {
    const foundUser = await userService.findByEmail('nonexistent@example.com');
    expect(foundUser).toBeNull();
  });
});
