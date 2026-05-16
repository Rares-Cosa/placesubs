/**
 * Calculate the number of days from today until the given date.
 * Returns a human-readable string like "in 7 days" or "tomorrow".
 */
export function getDaysUntil(dateString: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);

  const diffInMilliseconds = target.getTime() - today.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) return "overdue";
  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "tomorrow";
  return `in ${diffInDays} days`;
}

/**
 * Format a date string into a readable format like "Apr 26, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a number as currency (e.g., 15.99 → "$15.99")
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Capitalize first letter of a string ("monthly" → "Monthly")
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate total spent on a subscription since it started.
 * Returns { total, monthsCount } for display purposes.
 */
export function calculateTotalSpent(
  price: number,
  billingCycle: "monthly" | "yearly",
  startDate: string
): { total: number; monthsCount: number } {
  const start = new Date(startDate);
  const now = new Date();

  const monthsDiff =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  const monthsCount = Math.max(monthsDiff, 0);

  let total: number;
  if (billingCycle === "monthly") {
    total = price * monthsCount;
  } else {
    // For yearly subscriptions, calculate prorated total
    const yearsCount = monthsCount / 12;
    total = price * yearsCount;
  }

  return { total, monthsCount };
}