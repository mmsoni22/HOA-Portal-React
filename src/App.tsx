import { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "./services/api";
import type { User } from "./types/User";
import type { Payment, PaymentPlan } from "./types/Payment";
import Dashboard from "./components/Dashboard";
import "./styles/login.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [successMessage, setSuccessMesage] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  function handleLogin() {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    setCurrentUser(user);
    setError("");
  }

  async function handleMakePayment() {
    if (!currentUser || isPaying) {
      return;
    }

    setIsPaying(true);
    setSuccessMesage("");

    const amount = getPaymentPlan(currentUser.paymentPlan);

    const newPayment: Payment = {
      id: Date.now(),
      amount,
      date: new Date().toISOString().split("T")[0],
      plan: currentUser.paymentPlan,
    };

    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - amount,
      payments: [newPayment, ...currentUser.payments],
    };

    try {
      const savedUser = await updateUser(updatedUser);
      setCurrentUser(savedUser);
      setSuccessMesage("Payment successful!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPaying(false);
    }
  }

  function getPaymentPlan(plan: PaymentPlan) {
    switch (plan) {
      case "monthly":
        return 100;
      case "quarterly":
        return 300;
      case "yearly":
        return 1200;
      default:
        return 0;
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setEmail("");
    setPassword("");
    setError("");
  }

  async function handlePlanChange(plan: PaymentPlan) {
    if (!currentUser) {
      return;
    }

    const newBalance =
      plan === "monthly" ? 100 : plan === "quarterly" ? 300 : 1200;

    const updatedUser = {
      ...currentUser,
      paymentPlan: plan,
      balance: newBalance,
    };

    try {
      const savedUser = await updateUser(updatedUser);
      setCurrentUser(savedUser);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className="container"
        style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}
      >
        HOA Portal
      </div>
      {!currentUser ? (
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="logo-icon">⚡</div>
              <h2>Sign In</h2>
              <p>Access your account</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Email</label>
                  <span className="input-line"></span>
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper password-wrapper">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>Password</label>
                  <span className="input-line"></span>
                </div>
              </div>

              <button
                type="submit"
                className="login-btn btn"
                onClick={handleLogin}
              >
                <span className="btn-text">Sign In</span>
                <span className="btn-loader"></span>
                <span className="btn-glow"></span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Dashboard
          user={currentUser}
          onMakePayment={handleMakePayment}
          onLogout={handleLogout}
          onPlanChange={handlePlanChange}
          isPaying={isPaying}
          successMessage={successMessage}
        />
      )}
    </>
  );
}

export default App;
