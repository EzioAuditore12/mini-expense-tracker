import { Parser } from 'json2csv';

import { snakeCase } from 'change-case';

/**
 * Converts an array of objects to a CSV string.
 * - Prepends a serial_number column
 * - Converts camelCase keys to snake_case for readability
 * - Omits specified keys (e.g., internal IDs like 'id', 'userId')
 * - Serializes Date values to ISO strings
 */
export function convertObjectsToCsv<T extends Record<string, unknown>>(
  data: T[],

  omitKeys: (keyof T)[] = [],
) {
  if (!data.length) {
    return '';
  }

  const normalizedData = data.map((item, index) => ({
    serial_number: index + 1,
    ...Object.fromEntries(
      Object.entries(item)
        .filter(([key]) => !omitKeys.includes(key as keyof T))
        .map(([key, value]) => [
          snakeCase(key),
          value instanceof Date ? value.toISOString() : value,
        ]),
    ),
  }));

  const parser = new Parser();

  return parser.parse(normalizedData);
}
