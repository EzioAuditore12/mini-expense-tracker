import { expenseSchema } from '../expense.schema';

export const updateExpenseParamSchema = expenseSchema
  .pick({
    amount: true,
    expenseDate: true,
    note: true,
  })
  .optional();
