import { useState } from 'react';

import { exportExpensesApi } from '../../api/export-expenses.api';

import type { ExportExpensesParam } from '../../schemas/export/param.schema';

export function useExportExpenses() {
  const [isExporting, setIsExporting] = useState(false);

  const exportExpenses = async (query: ExportExpensesParam) => {
    try {
      setIsExporting(true);

      const blob = await exportExpensesApi(query);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.download = 'expenses.csv';

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportExpenses,
    isExporting,
  };
}
