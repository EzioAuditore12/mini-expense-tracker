import {
  ConflictError,
  NotFoundError,
  UnauthenticatedError,
} from 'express-error-toolkit';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { blackListedRefreshTokenTable } from '@/db/tables/blacklisted-refresh-token.table';

import { cryptoPassword } from '@/utils/crypto-password';
import { jwt } from '@/utils/jwt';

import { userService } from './user.service';

import type { RegisterRequestBody } from '@/validators/auth/register/request';
import type { RegisterResponseBody } from '@/validators/auth/register/response';

import { publicUserSchema } from '@/db/tables/user.table';
import type { LoginRequestBody } from '@/validators/auth/login/request';
import type { LoginResponseBody } from '@/validators/auth/login/response';
import type { RefreshResponseBody } from '@/validators/auth/refresh/response.schema';

export class AuthService {
  private readonly database = db;
  private readonly table = blackListedRefreshTokenTable;

  private readonly userService = userService;

  private readonly cryptoPassword = cryptoPassword;
  private readonly jwtService = jwt;

  public async register(
    registerRequest: RegisterRequestBody,
  ): Promise<RegisterResponseBody> {
    const { email, password, name } = registerRequest;

    const isExistingUser = await this.userService.findByEmail(email);

    if (isExistingUser)
      throw new ConflictError('User with this email already exists');

    const hashedPassword =
      await this.cryptoPassword.generateHashedPassword(password);

    const registeredUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    const tokens = await this.jwtService.generateAuthTokens(registeredUser.id);

    const publicUserDetails = publicUserSchema.strip().parse(registeredUser);

    return {
      user: publicUserDetails,
      tokens,
    };
  }

  public async login(
    loginRequest: LoginRequestBody,
  ): Promise<LoginResponseBody> {
    const { email, password } = loginRequest;

    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser)
      throw new NotFoundError('User with this email address does not exist');

    const isPasswordValid = await this.cryptoPassword.validatePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthenticatedError(
        'Either entered email or password is wrong',
      );

    const tokens = await this.jwtService.generateAuthTokens(existingUser.id);

    const publicUserDetails = publicUserSchema.strip().parse(existingUser);

    return {
      user: publicUserDetails,
      tokens,
    };
  }

  public async refresh(token: string): Promise<RefreshResponseBody> {
    const isBlacklistedToken = await this.isBlacklistedRefreshToken(token);

    if (isBlacklistedToken)
      throw new UnauthenticatedError('Given token is blacklisted');

    const tokenDetails = await this.jwtService.parseRefreshToken(token);

    if (!tokenDetails)
      throw new UnauthenticatedError('Given token is not valid');

    await this.insertBlaclistedRefreshToken({
      token,
      expiredAt: new Date(tokenDetails.exp),
      issuedAt: new Date(tokenDetails.iat),
    });

    const tokens = await this.jwtService.generateAuthTokens(tokenDetails.sub);

    return tokens;
  }

  private async insertBlaclistedRefreshToken({
    token,
    expiredAt,
    issuedAt,
  }: {
    token: string;
    issuedAt: Date;
    expiredAt: Date;
  }): Promise<void> {
    await this.database
      .insert(this.table)
      .values({ refreshToken: token, createdAt: issuedAt, expiredAt });
  }

  private async isBlacklistedRefreshToken(token: string): Promise<boolean> {
    const existingToken = await this.database
      .select({ id: this.table.id })
      .from(this.table)
      .where(eq(this.table.refreshToken, token))
      .then((res) => (res.length > 0 ? res[0] : null));

    if (existingToken) return true;

    return false;
  }
}

export const authService = new AuthService();
