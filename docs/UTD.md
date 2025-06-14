
# API Test Cases — Brandie Backend

This document outlines all the test cases implemented for the Brandie backend API using **Jest** and **Supertest**.

---

## Auth Routes

| Endpoint            | Method | Test Description                        |
|---------------------|--------|------------------------------------------|
| `/api/auth/register` | POST   | Register a new user                      |
| `/api/auth/login`    | POST   | Login with valid credentials             |
| `/api/auth/login`    | POST   | Login with wrong password (401)          |
| `/api/auth/register` | POST   | Register with duplicate email (409)      |

---

## User Follow Routes

| Endpoint                        | Method  | Test Description                          |
|----------------------------------|---------|--------------------------------------------|
| `/api/user/follow/:userId`       | POST    | Follow another user                        |
| `/api/user/unfollow/:userId`     | DELETE  | Unfollow a user                            |
| `/api/user/following`            | GET     | Get following list                         |
| `/api/user/followers`            | GET     | Get followers list                         |
| `/api/user/follow/:userId`       | POST    | 🔁 Should fail if user tries to follow self (400) |
| All follow routes                | ALL     | 🛠️ Should return 500 on DB failure (mocked)       |

---

## Post Routes

| Endpoint         | Method | Test Description                                      |
|------------------|--------|--------------------------------------------------------|
| `/api/posts`      | POST   | Add post with content/media                           |
| `/api/posts`      | POST   | 🔁 Reject empty post (400)                             |
| `/api/my-posts`   | GET    | Get logged-in user's posts                            |
| `/api/my-posts`   | GET    | 🛠️ Fail gracefully if getUserPosts throws (500 mocked) |
| `/api/feed`       | GET    | Get user's feed                                       |
| `/api/feed`       | GET    | 🛠️ Fail gracefully if getFeedPosts throws (500 mocked) |

---

## Middleware Edge Cases

| Scenario                    | Expected Result              |
|-----------------------------|------------------------------|
| Missing Authorization header | 401 - Missing or invalid token |
| Invalid or expired token     | 403 - Invalid token           |

---

## Coverage Summary (via `npm run test:coverage`)

```
Tests:       20+ total
Pass Rate:   100%
Coverage:    ~90% total line and branch
```

---

## Run Tests

```bash
npm run test           # Standard test run
npm run test:coverage  # With coverage report
```

> Ensure `.env.test` is active and DB is available or mocked as needed.
