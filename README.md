# LearnWise

This repository contains a small full stack example named **LearnWise**. It
consists of a React frontend and an Express backend using Prisma for a
PostgreSQL database.

The application demonstrates registration, login and a minimal dashboard with
protected API routes. AI powered features are represented by placeholders so
that you can later integrate OpenAI or another provider.

## Folder Structure

- `backend/` – Express API with Prisma
- `frontend/` – React UI built with Vite and TailwindCSS

Each folder contains its own README with setup instructions.

## AI Integration

The current code includes mocked endpoints for notes and recommendations. To
connect a real AI provider like OpenAI:

1. Create an API key with your provider.
2. In the backend, replace the placeholder functions in
   `src/controllers/ai.js` with calls to that provider.
3. Store any API keys in `.env` and load them via `dotenv`.
4. Update the frontend to display the richer AI responses.

See the backend and frontend READMEs for running the application locally.

## API Overview

The backend exposes a handful of endpoints used by the React frontend. All
authenticated routes expect a JWT in the `Authorization` header.

- `POST /api/auth/register` – register a new user
- `POST /api/auth/login` – login and get a JWT token
- `GET /api/topics` – list all topics
- `POST /api/topics` – create a topic
- `GET /api/topics/:id` – detailed topic information including quizzes
- `PUT /api/topics/:id` – update a topic
- `DELETE /api/topics/:id` – delete a topic
- `POST /api/topics/:id/quiz` – add a quiz question
- `PUT /api/topics/:id/quiz/:quizId` – update a quiz question
- `DELETE /api/topics/:id/quiz/:quizId` – remove a quiz question
- `PUT /api/topics/interest` – update the logged in user's interest
- `GET /api/user/me` – fetch the current user
- `PUT /api/user/progress` – update progress percentage
- `GET /api/ai/notes` – example AI notes
- `GET /api/ai/recommendations` – example AI recommendations
