export type PaymentPlan = "monthly" | "quarterly" | "yearly";

export interface Payment {
  id: number;
  amount: number;
  date: string;
  plan: PaymentPlan;
}
