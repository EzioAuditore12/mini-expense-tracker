import { faker } from '@faker-js/faker';

import { budgetService } from '../src/services/budget.service';

import { categoryEnum } from '../src/db/tables/enums/category.enum';

const USER_ID = '91649bff-37ee-441a-ae96-b6a36782bd21';

async function seedBudgets() {
  try {
    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;

    const year = currentDate.getFullYear();

    for (const category of categoryEnum) {
      await budgetService.create({
        userId: USER_ID,

        category,

        month,

        year,

        limitAmount: faker.number.int({
          min: 3000,

          max: 20000,
        }),
      });
    }

    console.log('✅ Budgets seeded successfully');
  } catch (error) {
    console.error(error);
  } finally {
    //@ts-ignore
    process.exit(0);
  }
}

seedBudgets();
