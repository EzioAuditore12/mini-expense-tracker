import { useQuery } from '@tanstack/react-query';

import type { GetAllExpensesParam } from '../../schemas/get-all/param.schema';

import { getAllExpensesApi } from '../../api/get-all-expenses.api';

export const USE_GET_ALL_EXPENSES_QUERY_KEY = 'expenses';

export function useGetAllExpenses({ page = 1, pageSize = 10, ...rest }: GetAllExpensesParam) {
  return useQuery({
    queryKey: [USE_GET_ALL_EXPENSES_QUERY_KEY, page, pageSize, rest],

    queryFn: () =>
      getAllExpensesApi({
        page,
        pageSize,
        ...rest,
      }),
  });
}
