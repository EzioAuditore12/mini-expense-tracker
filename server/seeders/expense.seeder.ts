import { faker } from '@faker-js/faker';

import { expenseService } from '../src/services/expense.service';
import { categoryEnum } from '../src/db/tables/enums/category.enum';

const USER_ID = '91649bff-37ee-441a-ae96-b6a36782bd21';

async function seedExpenses() {
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
