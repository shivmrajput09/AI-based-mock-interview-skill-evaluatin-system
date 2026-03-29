# AI Interview Agent (MERN)

## Structure

- backend/ - Node/Express API
  - src/config/db.js
  - src/middleware/authMiddleware.js
  - src/models/User.js
  - src/controllers/authController.js
  - src/routes/authRoutes.js
  - src/server.js
- frontend/ - React 19 + Vite + Tailwind
  - src/App.jsx, src/pages/Home.jsx, src/pages/Dashboard.jsx
  - src/services/api.js, src/services/authService.js

## Backend Setup

1. cd backend
2. copy .env.example to .env and set values
3. npm install
4. npm run dev

## Frontend Setup

1. cd frontend
2. copy .env.example to .env
3. npm install
4. npm run dev

## Notes

- Auth endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me (requires `Authorization: Bearer <token>`)

- JWT secret is required in backend `.env`.
