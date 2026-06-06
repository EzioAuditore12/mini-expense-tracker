import countryToCurrency from 'country-to-currency';

/**
 * Formats a given amount into a localized currency string.
 * Uses the country code to determine the currency. Defaults to 'IN' (India -> INR).
 */
export function formatCurrency(amount: number, countryCode: string = 'IN') {
  // Map country code to currency code (e.g., 'IN' -> 'INR')
  const currencyCode = countryToCurrency[countryCode as keyof typeof countryToCurrency] || 'INR';

  // Format using standard Intl API
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
