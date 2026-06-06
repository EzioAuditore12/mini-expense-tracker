import * as jose from 'jose';

import { env } from '@/env';

export interface DecodedTokenResponse {
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Helper: converts a string secret to Uint8Array as required by the `jose` library.
 */
function toUint8Array(secret: string) {
  return new TextEncoder().encode(secret);
}

/**
 * JWT service using HS256 symmetric signing.
 * Manages two independent token types with separate secrets & TTLs:
 *   - Access token  (short-lived, e.g. 15m)  — sent on every API request
 *   - Refresh token (long-lived, e.g. 7d)   — used only to obtain a new access token
 */
export class Jwt {
  private readonly accessSecret = toUint8Array(env.ACCESS_SECRET_KEY);
  private readonly accessExpireDuration = env.ACCESS_EXPIRATION_DURATION;

  private readonly refreshSecret = toUint8Array(env.REFRESH_SECRET_KEY);
  private readonly refreshExpireDuration = env.REFRESH_EXPIRATION_DURATION;

  /** Generate both access and refresh tokens for the given user ID (sub) */
  public async generateAuthTokens(
    sub: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateAccessToken(sub);
    const refreshToken = await this.generateRefreshToken(sub);

    return { accessToken, refreshToken };
  }

  public async generateAccessToken(sub: string): Promise<string> {
    return await new jose.SignJWT({ sub })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(new Date())
      .setExpirationTime(this.accessExpireDuration)
      .sign(this.accessSecret);
  }

  public async generateRefreshToken(sub: string): Promise<string> {
    return await new jose.SignJWT({ sub })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(new Date())
      .setExpirationTime(this.refreshExpireDuration)
      .sign(this.refreshSecret);
  }

  /**
   * Verify and decode an access token. Returns null instead of throwing
   * on expired/tampered tokens so callers can handle failure gracefully.
   */
  public async parseAccessToken(
    token: string,
  ): Promise<DecodedTokenResponse | null> {
    try {
      const { payload } = await jose.jwtVerify(token, this.accessSecret);
      return payload as DecodedTokenResponse;
    } catch {
      return null;
    }
  }

  public async parseRefreshToken(
    token: string,
  ): Promise<DecodedTokenResponse | null> {
    try {
      const { payload } = await jose.jwtVerify(token, this.refreshSecret);
      return payload as DecodedTokenResponse;
    } catch {
      return null;
    }
  }
}

export const jwt = new Jwt();
