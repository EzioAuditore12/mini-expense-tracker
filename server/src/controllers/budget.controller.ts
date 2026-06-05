import type { Request, Response } from 'express';
import {
  ConflictError,
  NotFoundError,
  UnauthenticatedError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-codes';

import { budgetService } from '@/services/budget.service';

import type { CreateBudgetRequest } from '@/validators/main/budget/create/request';
import type { UpdateBudgetRequest } from '@/validators/main/budget/update/request';
import type { BudgetParamRequest } from '@/validators/main/budget/param';
import type { GetAllBudgetsRequest } from '@/validators/main/budget/get-all/request';
import type { BudgetDeleteParamRequest } from '@/validators/main/budget/delete/request';
import { BudgetStatusRequest } from '@/validators/main/budget/status/request.schema';

export class BudgetController {
  private readonly budgetService = budgetService;

  public create = async (req: CreateBudgetRequest, res: Response) => {
    const userId = req.user?.id!;
    const body = req.body;

    const { category, month, year } = body;

    const isConflict = await this.budgetService.checkUniqueConstraint(
      userId,
      category,
      month,
      year,
    );

    if (isConflict) {
      throw new ConflictError(
        'A budget for this category, month, and year already exists',
      );
    }

    const result = await this.budgetService.create({ userId, ...body });
    return res.status(StatusCodes.CREATED).send(result);
  };

  public update = async (req: UpdateBudgetRequest, res: Response) => {
    const userId = req.user?.id!;
    const budgetId = req.params.id;
    const body = req.body;

    const isCreatorAndExistingBudget =
      await this.budgetService.isCreatorAndExisting(userId, budgetId);

    if (!isCreatorAndExistingBudget)
      throw new UnauthenticatedError(
        'Either the budget does not exist or creator and user not same ',
      );

    const existingBudget = await this.budgetService.findOne(budgetId);
    if (!existingBudget) {
      throw new NotFoundError('No Such Record with id for this budget exists');
    }

    const category = body.category ?? existingBudget.category;
    const month = body.month ?? existingBudget.month;
    const year = body.year ?? existingBudget.year;

    const isConflict = await this.budgetService.checkUniqueConstraint(
      userId,
      category,
      month,
      year,
      budgetId,
    );

    if (isConflict) {
      throw new ConflictError(
        'A budget for this category, month, and year already exists',
      );
    }

    const result = await this.budgetService.update(budgetId, body);
    return res.status(StatusCodes.ACCEPTED).send(result);
  };

  public get = async (req: BudgetParamRequest, res: Response) => {
    const budgetId = req.params.id;

    const result = await this.budgetService.findOne(budgetId);

    if (!result)
      throw new NotFoundError('No Such Record with id for this budget exists');

    return res.status(StatusCodes.OK).send(result);
  };

  public getAllByUserId = async (req: GetAllBudgetsRequest, res: Response) => {
    const userId = req.user?.id!;
    const query = req.query;

    const result = await this.budgetService.getAllByUserId(userId, query);

    return res.status(StatusCodes.ACCEPTED).send(result);
  };

  public delete = async (req: BudgetDeleteParamRequest, res: Response) => {
    const userId = req.user?.id!;
    const budgetId = req.params.id;

    const isCreatorAndExistingBudget =
      await this.budgetService.isCreatorAndExisting(userId, budgetId);

    if (!isCreatorAndExistingBudget)
      throw new UnauthenticatedError(
        'Either the budget does not exist or creator and user not same ',
      );

    await this.budgetService.delete(budgetId);

    return res
      .status(StatusCodes.ACCEPTED)
      .send({ message: `Record ${budgetId} deleted successfully` });
  };

  public getBudgetStatusByUserId = async (
    req: BudgetStatusRequest,
    res: Response,
  ) => {
    const userId = req.user?.id!;

    const { month, year } = req.query;

    const result = await this.budgetService.getBudgetStatusByUserId(
      userId,
      month,
      year,
    );

    return res.status(StatusCodes.OK).send(result);
  };
}

export const budgetController = new BudgetController();
