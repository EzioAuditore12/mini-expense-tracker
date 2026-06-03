import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'express-error-toolkit';

import { userService } from '@/services/user.service';
import { publicUserSchema } from '@/db/tables/user.table';

export class UserController {
  private readonly userService = userService;

  public get: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const userDetails = await this.userService.findOne(userId);

    if (!userDetails)
      throw new NotFoundError('Given user with this id not found');

    const result = publicUserSchema.strip().parse(userDetails);

    return res.status(StatusCodes.OK).send(result);
  };

  public getProfile: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const userDetails = await this.userService.findOne(userId);

    if (!userDetails)
      throw new NotFoundError('Given user with this id not found');

    const result = publicUserSchema.strip().parse(userDetails);

    return res.status(StatusCodes.OK).send(result);
  };
}

export const userController = new UserController();
