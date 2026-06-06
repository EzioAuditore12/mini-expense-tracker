import { getYear } from 'date-fns';

export const yearItems = Array.from({ length: 5 }, (_, index) => {
  const year = getYear(new Date()) + index;

  return {
    label: String(year),
    value: String(year),
  };
});
