import { z } from 'zod';

import { budgetSchema } from '../../budget.schema';
import { isNumeric } from 'validator';

export const createBudgetParamSchema = budgetSchema
  .pick({
    category: true,
    limitAmount: true,
    month: true,
    year: true,
  })
  .extend({
    limitAmount: z
      .string()
      .refine((val) => isNumeric(val), { error: 'Amount must be numeric' })
      .refine((val) => Number(val) > 0, {
        message: 'Amount must be positive',
      }),
    month: z
      .string()
      .refine((val) => isNumeric(val), {
        message: 'Month must be numeric',
      })
      .refine(
        (val) => {
          const num = Number(val);

          return num >= 1 && num <= 12;
        },
        {
          message: 'Month must be between 1 and 12',
        }
      ),

    year: z
      .string()
      .refine((val) => isNumeric(val), {
        message: 'Year must be numeric',
      })
      .refine((val) => Number(val) >= 2020, {
        message: 'Invalid year',
      }),
  });

export type CreateBudgetParam = z.infer<typeof createBudgetParamSchema>;
