# 🏠 HOA Portal

A responsive Homeowner Association (HOA) portal built with **React and TypeScript** that allows homeowners to view balances, select payment plans, and make HOA payments.

This project is designed as a **production-style MVP**, using a mock backend with clean separation of concerns and future scalability in mind.

https://hoa-portal-react.vercel.app/

---

## ✨ Features

- Simulated user authentication
- HOA payments with:
  - Monthly plan
  - Quarterly plan
  - Yearly plan
- Dashboard displaying:
  - Current balance
  - Selected payment plan
  - Payment history
- Persisted state using a mock backend
- Protection against duplicate payments
- Loading and success feedback during payment actions
- Responsive UI for desktop and mobile

---

## 🧠 Design Philosophy

This project was built following real-world engineering principles:

- Clear business rules over clever logic
- Immutable state updates
- Strong type safety with TypeScript
- Clean separation between UI and data logic
- MVP-first approach with documented future enhancements

Complex billing-cycle enforcement (e.g., restricting payments to one per period) is intentionally deferred to a later phase to keep the MVP clean and understandable.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **State Management:** React Hooks
- **Styling:** CSS
- **Backend:** Mock JSON-based service
- **Build Tool:** Vite
- **Deployment:** Vercel

---

## 📁 Project Structure

src/
├── components/
│ ├── Dashboard.tsx # User dashboard UI
│ └── Login.tsx # Login screen
├── services/
│ └── api.ts # Mock backend logic
├── types/
│ └── index.ts # Shared TypeScript types
├── App.tsx # App state & business logic
└── main.tsx # Application entry point

### Structure Rationale

- UI components are separated from business logic
- Backend logic is abstracted behind a service layer
- Shared types are centralized
- Mock backend can be replaced with a real API easily

---

## 💳 Payment Logic

- HOA fees are defined as:
  - Monthly: $100
  - Quarterly: $300
  - Yearly: $1200
- Changing a payment plan:
  - Applies only to future payments
  - Resets the current balance
- Duplicate payment submissions are prevented via UI state
- Billing cycle enforcement is planned for a future iteration

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/hoa-portal.git
cd hoa-portal

npm install

## Run Locally

npm run dev

### The app will be available at:

http://localhost:5173

## Production Build

http://localhost:5173

## Deployment

The application is deployed using Vercel, enabling:

- The application is deployed using Vercel, enabling:
- Zero-configuration setup
- Global CDN distribution

## Future Enhancement

- Billing cycle enforcement (monthly / quarterly / yearly)
- Proration when changing plans mid-cycle
- Proration when changing plans mid-cycle
- Real authentication and backend API
- Payment gateway integration (e.g., Stripe)

## Collaboration Notes

This project follows patterns used in professional teams:

- MVP-focused delivery
- Explicit trade-offs documented
- Clean and maintainable architecture

```
