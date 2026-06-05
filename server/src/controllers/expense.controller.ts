import type { Request, Response } from 'express';
import { NotFoundError, UnauthenticatedError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-codes';

import { expenseService } from '@/services/expense.service';

import type { CreateExpenseRequest } from '@/validators/main/expense/create/request';
import type { UpdateExpenseRequest } from '@/validators/main/expense/update/request';
import type { ExpenseParamRequest } from '@/validators/main/expense/param';
import type { GetAllExpensesRequest } from '@/validators/main/expense/get-all/request';
import type { ExpenseDeleteParamRequest } from '@/validators/main/expense/delete/request';

export class ExpenseController {
  private readonly expenseService = expenseService;

  public create = async (req: CreateExpenseRequest, res: Response) => {
    const userId = req.user?.id!;
    const body = req.body;

    const result = await this.expenseService.create({ userId, ...body });

    return res.status(StatusCodes.CREATED).send(result);
  };

  public update = async (req: UpdateExpenseRequest, res: Response) => {
    const userId = req.user?.id!;
    const expenseId = req.params.id;
    const body = req.body;

    const isCreatorAndExistingExpense =
      await this.expenseService.isCreatorAndExisting(userId, expenseId);

    if (!isCreatorAndExistingExpense)
      throw new UnauthenticatedError(
        'Either the expense does not exist or creator and user not same ',
      );

    const result = await this.expenseService.update(expenseId, body);

    return res.status(StatusCodes.ACCEPTED).send(result);
  };

  public get = async (req: ExpenseParamRequest, res: Response) => {
    const expenseId = req.params.id;

    const result = await this.expenseService.findOne(expenseId);

    if (!result)
      throw new NotFoundError('No Such Record with id for this expense exists');

    return res.status(StatusCodes.OK).send(result);
  };

  public getAllByUserId = async (req: GetAllExpensesRequest, res: Response) => {
    const userId = req.user?.id!;
    const query = req.query;

    const result = await this.expenseService.getAllByUserId(userId, query);

    return res.status(StatusCodes.ACCEPTED).send(result);
  };

  public delete = async (req: ExpenseDeleteParamRequest, res: Response) => {
    const userId = req.user?.id!;
    const expenseId = req.params.id;

    const isCreatorAndExistingExpense =
      await this.expenseService.isCreatorAndExisting(userId, expenseId);

    if (!isCreatorAndExistingExpense)
      throw new UnauthenticatedError(
        'Either the expense does not exist or creator and user not same ',
      );

    await this.expenseService.delete(expenseId);

    return res
      .status(StatusCodes.ACCEPTED)
      .send({ message: `Record ${expenseId} deleted successfully` });
  };

  public getSummaryByUserId = async (req: Request, res: Response) => {
    const userId = req.user?.id!;

    const result = await this.expenseService.getSummaryByUserId(userId);

    return res.status(StatusCodes.OK).send(result);
  };

  public getCategorySummaryByUserId = async (req: Request, res: Response) => {
    const userId = req.user?.id!;

    const result = await this.expenseService.getCategorySummaryByUserId(userId);

    return res.status(StatusCodes.OK).send(result);
  };

  public getMonthlyTrendByUserId = async (req: Request, res: Response) => {
    const userId = req.user?.id!;

    const result = await this.expenseService.getMonthlyTrendByUserId(userId);

    return res.status(StatusCodes.OK).send(result);
  };
}

export const expenseController = new ExpenseController();
