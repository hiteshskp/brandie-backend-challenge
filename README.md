# Brandie Backend Challenge

A minimal, production-ready social media backend built with **Node.js**, **Express**, and **PostgreSQL**, designed for the Brandie Backend Engineer assignment. Fully deployed, tested, and secured.

---

## Live Deployment

- **Backend URL**: [https://brandie-backend-challenge.onrender.com](https://brandie-backend-challenge.onrender.com)
- **Postman Collection**: [`docs/test_postman_collection.json`](./docs/test_postman_collection.json)

---

## Features

- ✅ JWT-based User Authentication
- ✅ Follow/Unfollow other users
- ✅ View Followers and Following lists
- ✅ Create posts (text + media)
- ✅ View personal posts
- ✅ View feed from followed users
- ✅ Full test suite with edge case coverage
- ✅ Dockerized PostgreSQL integration
- ✅ Render-hosted production instance

---

## Security & Best Practices

- Passwords hashed using **bcrypt**
- JWT secrets managed via environment variables (never in code)
- Protected routes secured with middleware
- PostgreSQL on Render uses **SSL/TLS enforced** connection
- Rate limiting and validation layers ready for scale-out

---

## Tech Stack

- Node.js 18+
- Express.js
- PostgreSQL 15
- Docker + Docker Compose
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
docs/                 # TDD, UTD, Postman
sql/                  # schema.sql, seed.sql
```

---

## Setup Instructions (Local)

```bash
# Clone the repo
git clone https://github.com/your-username/brandie-backend-challenge.git
cd brandie-backend-challenge

# Install dependencies
npm install

# Set up env
cp .env.test.example .env
cp .env.test.example .env.test

# Start PostgreSQL via Docker
docker-compose up -d

# Run development server
npm run dev
```

---

## Testing

```bash
npm run test           # Run all tests
npm run test:coverage  # View coverage report
```

> For test cases, see [UTD.md](./docs/UTD.md)

---

## Usage Guide

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "hitesh",
  "email": "hitesh@example.com",
  "password": "hitesh123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "hitesh@example.com",
  "password": "hitesh123"
}
```

Response:
```json
{
  "token": "<JWT>"
}
```

Use `Authorization: Bearer <JWT>` header in the following routes.

---

### Create Post

```http
POST /api/posts
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "content": "My first post",
  "mediaUrl": "https://example.com/image.png"
}
```

### Follow a User

```http
POST /api/user/follow/<userId>
Authorization: Bearer <JWT>
```

### View Feed

```http
GET /api/feed
Authorization: Bearer <JWT>
```

---

## Environment Variables

Use `.env.test.example` as base:

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

## Assumptions

- Media input is a URL string (uploading not required)
- No pagination required (MVP only)
- Posts are globally visible to followers
- All dates in UTC

---

## Submission Checklist

- [x] Functional APIs (auth, follow, post, feed)
- [x] Deployed on Render (secure SSL)
- [x] 90%+ test coverage with edge cases
- [x] Dockerized DB setup
- [x] Postman tests in `docs/test_postman_collection.json`
- [x] `.env.test` isolated + secured
- [x] README + `deployment-complete.md`

---

Project is complete, tested, deployed, and ready for review.
