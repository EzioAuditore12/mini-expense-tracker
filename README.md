# Mini Expense Tracker

This repository contains the solution for **Exercise : Mini Expense Tracker**. It is a full-stack web application designed to help users log their daily spending across various categories and gain insights into where their money is going. The application features a rich user interface, data aggregation, interactive charts, CSV data export, and complete CRUD functionality secured by JWT authentication. 

## Live Demo Links

- **Frontend App (Vercel)**: [https://mini-expense-tracker-drab.vercel.app/](https://mini-expense-tracker-drab.vercel.app/)
- **Backend API Base URL (Railway)**: [https://mini-expense-tracker-production.up.railway.app](https://mini-expense-tracker-production.up.railway.app)
- **API Documentation (Swagger/Scalar)**: [https://mini-expense-tracker-production.up.railway.app/docs](https://mini-expense-tracker-production.up.railway.app/docs)

## Features & Requirements Checklist

### Must Have
- ✅ Add an expense with: amount (positive number), category (e.g. Food, Transport, Bills, Entertainment, Other), date, and an optional note.
- ✅ View all expenses in a table or list, sorted by date (newest first).
- ✅ Edit and delete existing expenses.
- ✅ Filter expenses by category and by date range (e.g. this month, last month, custom).
- ✅ A summary panel showing: total spent this month, total per category, and the highest single expense.

### Should Have
- ✅ A simple chart showing expenses by category (pie or bar).
- ✅ Currency formatting that respects the user's locale, or at least is consistent.
- ✅ Form validation - no negative amounts, no future dates beyond today, category is required.

### Nice to Have (Bonus)
- ✅ Export visible expenses as a CSV download (fully implemented with support for all date ranges and category filters).
- ✅ A small 'budget' setting per category, with a visual indicator when spending exceeds it.
- ✅ Persistence to SQLite.

## Tech Stack

### Frontend
- **React & Vite**: Chosen for an exceptionally fast development server and optimized production builds.
- **TypeScript**: Ensures type safety, fewer runtime errors, and a better developer experience.
- **Tailwind CSS & shadcn/ui**: Used for building beautifully designed, accessible, and highly customizable UI components quickly.
- **@tanstack/react-query**: Standard for robust server-state management, caching, and background data fetching.
- **@tanstack/react-router**: Selected for type-safe client-side routing.
- **@tanstack/react-form**: Used for highly performant and type-safe form validation and state management.
- **Recharts**: For displaying expense summary trends and categorizations visually via charts.
- **Zustand**: A lightweight, unopinionated client-state management library for simple global state.

### Backend
- **Node.js & Express**: A lightweight, fast, unopinionated web framework for building robust RESTful APIs.
- **TypeScript**: Shared typings across the full stack.
- **Drizzle ORM**: A modern, highly performant, type-safe ORM.
- **Better-SQLite3**: An ultra-fast SQLite driver used as the database for straightforward persistence.
- **json2csv**: For generating downloadable CSV reports of expenses.
- **Zod**: For defining data schemas once, and reusing them for validation and OpenAPI spec generation.
- **@asteasolutions/zod-to-openapi & @scalar/express-api-reference**: Automates the generation and hosting of interactive OpenAPI documentation directly from Zod validations.

## How to Run Locally

### Prerequisites
- **Node.js** installed on your machine.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EzioAuditore12/mini-expense-tracker.git
   cd mini-expense-tracker
   ```

2. **Start the Backend Server:**
   Open a terminal and run the following commands:
   ```bash
   cd server
   npm install
   npm run db:push     # Pushes the schema to the SQLite database
   npm run seed:budget # Seeds initial budgets
   npm run seed:expense # Seeds initial expenses
   npm run dev
   ```
   *The backend will be running on `http://localhost:8000` (or as defined in your environment variables).*

3. **Start the Frontend Application:**
   Open a separate terminal window and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *The client will start and be available at `http://localhost:5173`.*

## API Documentation

To keep this README concise, we only expose an example endpoint below. The backend uses Swagger/Scalar to generate robust and highly interactive API documentation from our Zod schemas.

👉 **Please migrate to the [Live API Docs](https://mini-expense-tracker-production.up.railway.app/docs) for the complete list of available endpoints, request bodies, and response shapes.** *(Or visit `http://localhost:8000/docs` when running the server locally).*

### Example Endpoint: Fetch Expenses
- **Method & Path**: `GET /api/expenses`
- **Query Params**: `month`, `year`, `categoryId`, `startDate`, `endDate`
- **Response Shape**: `{ data: Expense[], meta: PaginationMeta }`

## Project Structure

The repository uses a single monorepo structure with distinct `/client` and `/server` folders.

```text
mini-expense-tracker/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── app/            # Application routes (React Router configuration)
│   │   ├── components/     # Reusable global UI elements (buttons, inputs, etc.)
│   │   ├── features/       # Feature-based architecture (contains components, hooks, schemas specific to a domain, e.g., 'expenses', 'dashboard')
│   │   ├── store/          # Zustand global state store
│   │   └── lib/            # Utilities and configurations
│   └── package.json
└── server/                 # Backend REST API
    ├── src/
    │   ├── db/             # Drizzle ORM setup and SQLite database config
    │   ├── routers/        # Express route definitions
    │   ├── controllers/    # Request handling and response formatting
    │   ├── services/       # Core business logic and database interactions
    │   ├── validators/     # Zod schemas for validating request payloads
    │   └── middlewares/    # Custom middlewares for error handling
    └── package.json
```

**Architecture Notes:**
- The **frontend** strictly adheres to a **feature-based architecture**, keeping related domains (like `expenses`, `dashboard`) encapsulated together rather than splitting horizontally by type.
- The **backend** follows a structured layered architecture utilizing **Routers**, **Controllers**, and **Services** to separate HTTP logic from core business logic cleanly.

## Next Steps

**What I went above and beyond to build (Bonus Features):**
- **JWT Authentication**: Although the brief stated "assume one user", I implemented a secure JWT-based authentication system to ensure data privacy and secure API access.

**What I chose not to do:**
- **Complex receipt parsing**: Parsing uploaded receipts using `unstructured` was out of scope for a "mini" project, but would be an excellent real-world feature.

**What I would build next:**
- **Advanced Export Configurations**: Giving the user the capability to export specific custom date ranges as PDFs alongside the existing CSV format.
