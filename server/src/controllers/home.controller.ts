import type { Request, Response } from 'express';
import { env } from '@/env';

export const getHome = (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mini Expense Tracker API</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Inter, sans-serif;
          }

          body {
            background: #0f172a;
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }

          .card {
            width: 100%;
            max-width: 700px;
            background: #111827;
            border: 1px solid #1e293b;
            border-radius: 20px;
            padding: 40px;
          }

          h1 {
            font-size: 2.5rem;
            margin-bottom: 12px;
          }

          p {
            color: #94a3b8;
            line-height: 1.7;
            margin-bottom: 24px;
          }

          .links {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }

          a {
            text-decoration: none;
            padding: 12px 18px;
            border-radius: 10px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          .docs {
            background: #3b82f6;
            color: white;
          }

          .frontend {
            background: #22c55e;
            color: white;
          }

          a:hover {
            opacity: 0.9;
            transform: translateY(-2px);
          }

          .footer {
            margin-top: 28px;
            color: #64748b;
            font-size: 14px;
          }

          code {
            background: #1e293b;
            padding: 4px 8px;
            border-radius: 6px;
          }
        </style>
      </head>

      <body>
        <div class="card">
          <h1>Mini Expense Tracker API</h1>

          <p>
            Backend service for authentication, expense management,
            budgets, analytics, and reporting.
          </p>

          <div class="links">
            <a class="docs" href="/docs">
              API Documentation
            </a>

            <a
              class="frontend"
              href="${env.CORS_ORIGIN}"
              target="_blank"
            >
              Frontend App
            </a>
          </div>

          <div class="footer">
            Built with <code>Express</code>, <code>TypeScript</code>,
            <code>Drizzle ORM</code>, <code>SQLite</code>,
            and <code>Zod</code>.
          </div>
        </div>
      </body>
    </html>
  `);
};
