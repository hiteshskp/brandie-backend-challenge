# Brandie Backend Challenge

A minimal social media backend built with **Node.js**, **Express**, and **PostgreSQL**, designed for the Brandie Backend Engineer assignment.

---

## Features

-  User Authentication (JWT)
-  Follow/Unfollow other users
-  View Followers and Following lists
-  Create text/media posts
-  View personal posts
-  View feed from followed users

---

## Tech Stack

- Node.js 18+
- Express.js
- PostgreSQL 15
- Docker & Docker Compose
- Jest + Supertest (90%+ coverage)

---

## Folder Structure

```
src/
  ├── controllers/    # Business logic
  ├── models/         # DB operations
  ├── routes/         # API endpoints
  ├── middleware/     # JWT auth
  ├── config/         # DB connection
  ├── app.js          # Express app
  └── server.js       # Entry point
tests/                # Jest test files
docs/                 # TDD, UTD, etc.
sql/                  # schema.sql, seed.sql
```

---

## Setup Instructions

```bash
# Clone repo
git clone https://github.com/your-username/brandie-backend-challenge.git
cd brandie-backend-challenge

# Install deps
npm install

# Create .env and .env.test from example
cp .env.test.example .env
cp .env.test.example .env.test

# Start PostgreSQL via Docker
docker-compose up -d

# Run the dev server
npm run dev
```

---

## Testing

```bash
npm run test           # Run tests
npm run test:coverage  # Run with coverage report
```

> See [UTD.md](./docs/UTD.md) for a full list of test scenarios (unit test document)

---

## Environment Variables

Copy and modify from `.env.test.example`:

```
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=brandie_test_db
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=yourtestsecret
NODE_ENV=development
```

---

## Decisions & Notes

-  REST was chosen over GraphQL for simplicity
-  JWT used over cookie-based auth for flexibility
-  PostgreSQL selected for strong relational modeling (follows/posts)
-  Docker for DB portability
-  Project refactored into scalable `/src` structure

---

## Test Coverage Summary

- 20+ tests written using Jest + Supertest
- Covers: auth, follow, post, edge cases, error handling
- Run `npm run test:coverage` to see live results

---

## Submission Checklist

- [x] Functional auth/follow/feed APIs
- [x] Test coverage with edge cases
- [x] `.env.test` isolated environment
- [x] Dockerized DB setup
- [x] README with setup + decisions
- [x] UTD.md with scenarios (unit test document)
