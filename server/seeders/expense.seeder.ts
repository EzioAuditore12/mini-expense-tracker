import { faker } from '@faker-js/faker';

import { expenseService } from '../src/services/expense.service';
import { categoryEnum } from '../src/db/tables/enums/category.enum';

import { env } from '../src/env';

const USER_ID = env.TEST_USER_ID;

async function seedExpenses() {
  console.log(USER_ID);

  try {
    const expenses = Array.from({ length: 100 }, () => ({
      userId: USER_ID,

      amount: faker.number.int({
        min: 100,
        max: 10000,
      }),

      category: faker.helpers.arrayElement(categoryEnum),

      note: faker.commerce.productName(),

      expenseDate: faker.date.recent({
        days: 180,
      }),
    }));

    for (const expense of expenses) {
      await expenseService.create(expense);
    }

    console.log('✅ Expenses seeded successfully');
  } catch (error) {
    console.error(error);
  } finally {
    //@ts-ignore
    process.exit(0);
  }
}

seedExpenses();
