import type { User } from "../types/User";
import "../styles/cards.css";
import { getNextPaymentDate, canMakePayment } from "../types/Payment";

interface DashboardProps {
  user: User;
  onMakePayment: () => void;
  onLogout: () => void;
  onPlanChange: (plan: "monthly" | "quarterly" | "yearly") => void;
  isPaying: boolean;
  successMessage: string;
}

function Dashboard({
  user,
  onMakePayment,
  onLogout,
  onPlanChange,
  isPaying,
  successMessage,
}: DashboardProps) {
  const nextPaymentDate = getNextPaymentDate(user.payments, user.paymentPlan);
  const canPay =
    nextPaymentDate === null ? true : canMakePayment(nextPaymentDate);
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name}</h2>
        <p>Payment plan: {user.paymentPlan}</p>
        <p>Balance: ${user.balance}</p>

        <label>
          Payment Plan:
          <select
            value={user.paymentPlan}
            onChange={(e) =>
              onPlanChange(e.target.value as "monthly" | "quarterly" | "yearly")
            }
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        <button onClick={onMakePayment} disabled={isPaying || !canPay}>
          {isPaying ? "Processing..." : "Make Payment"}
        </button>

        {!canPay && (
          <p style={{ color: "gray", marginTop: "8px" }}>
            NextPayment available on <strong>{nextPaymentDate}</strong>
          </p>
        )}

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>

      <div className="card">
        <h3>Payment History</h3>

        {user.payments.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          <ul>
            {user.payments.map((payment) => (
              <li key={payment.id}>
                ${payment.amount} — {payment.plan} — {payment.date}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
