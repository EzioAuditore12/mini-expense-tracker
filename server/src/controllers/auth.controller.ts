import type { RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authService } from '@/services/auth.service';

import type { RegisterRequest } from '@/validators/auth/register/request';
import type { LoginRequest } from '@/validators/auth/login/request';
import type { RefreshRequest } from '@/validators/auth/refresh/request.schema';

export class AuthController {
  private readonly authService = authService;

  public register: RequestHandler = async (
    req: RegisterRequest,
    res: Response,
  ) => {
    const result = await this.authService.register(req.body);

    return res.status(StatusCodes.CREATED).send(result);
  };

  public login: RequestHandler = async (req: LoginRequest, res: Response) => {
    const result = await this.authService.login(req.body);

    return res.status(StatusCodes.ACCEPTED).send(result);
  };

  public refresh: RequestHandler = async (
    req: RefreshRequest,
    res: Response,
  ) => {
    const result = await this.authService.refresh(req.body.refreshToken);

    return res.status(StatusCodes.CREATED).send(result);
  };
}

export const authController = new AuthController();
