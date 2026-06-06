import { authenticatedFetch } from '@/lib/auth-fetch';
import type { ExportExpensesParam } from '../schemas/export/param.schema';

export const exportExpensesApi = async (query: ExportExpensesParam) => {
  return await authenticatedFetch({
    url: 'expense/export',
    method: 'GET',
    query,
  });
};
