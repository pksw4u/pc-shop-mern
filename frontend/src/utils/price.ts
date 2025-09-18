/**
 * Format price in Indian Rupees (INR)
 * @param price - Price in rupees (number)
 * @returns Formatted price string with ₹ symbol
 */
export const formatINR = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Format price for display with currency symbol
 * @param price - Price in rupees (number)
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return formatINR(price);
};