# LearnWise Backend

This folder contains a simple Express server with Prisma and JWT authentication.
It exposes registration and login endpoints and a couple of protected routes for
managing learning topics. The server is intentionally minimal so that new
developers can easily understand how each part works.

Additional routes provide mocked AI notes and recommendations as well as a
quiz system backed by a `Topic` and `Quiz` table. These can be expanded to
integrate real AI services.

## Setup

1. Copy `.env.example` to `.env` and fill in your database credentials and JWT
   secret.
2. Install dependencies with `npm install` (requires internet access).
3. Run Prisma migrations with `npx prisma migrate dev` to create the database
   tables for `User`, `Topic` and `Quiz`.
4. Start the server using `npm run dev`.

By default the server runs on port `3001` and exposes its API under `/api`.
