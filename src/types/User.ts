import type { Payment, PaymentPlan } from "./Payment";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  paymentPlan: PaymentPlan;
  balance: number;
  payments: Payment[];
}
