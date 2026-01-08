export type PaymentPlan = "monthly" | "quarterly" | "yearly";

export interface Payment {
  id: number;
  amount: number;
  date: string;
  plan: PaymentPlan;
}

export function getNextPaymentDate(payments: Payment[], plan: PaymentPlan) {
  // filter payment for selected plan
  const planPayments = payments.filter((p) => p.plan === plan);

  if (planPayments.length === 0) {
    return null;
  }

  /// Sort Payments by date descending (most recent first)
  const sortedPayments = planPayments.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // The last payment is now the first element
  const lastPayments = sortedPayments[0];

  const lastDate = new Date(lastPayments.date);

  let nextDate: Date;

  switch (plan) {
    case "monthly":
      nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;

    case "quarterly":
      nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;

    case "yearly":
      nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 12);
      break;
  }

  const yyyy = nextDate.getFullYear();
  const mm = String(nextDate.getMonth() + 1).padStart(2, "0");
  const dd = String(nextDate.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export function canMakePayment(nextPaymentDate: string): boolean {
  const today = new Date();
  const nextDate = new Date(nextPaymentDate);

  return today >= nextDate;
}
