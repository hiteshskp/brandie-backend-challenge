# Deployment Complete

This document confirms that the Brandie Backend Challenge project has been fully deployed and is production-ready.

---

## Live Deployment

- **Backend API URL**: [https://brandie-backend-challenge.onrender.com](https://brandie-backend-challenge.onrender.com)
- **Status**: Live and authenticated

---

## Deployed Features

- JWT-based user authentication (`/register`, `/login`)
- Follow / Unfollow user graph
- Followers and Following list
- Post creation with optional media
- Feed from followed users
- 90%+ test coverage with Jest + Supertest
- PostgreSQL database (Render managed)
- Dockerized local dev support

---

## Seeded Users

Example credentials for testing:

```
hitesh@example.com / hitesh123
mridul@example.com / mridul123
```

---

## Testing

- Hosted Postman Collection: Included in repo under `docs/test_postman_collection.json`
- Run `/api/feed`, `/api/my-posts`, `/api/posts`, etc.
- Use Bearer token for protected routes

---

## Database

- PostgreSQL Render DB with SSL
- Schema initialized manually
- Seeded using direct SQL

---

## Ready for Submission

This deployment satisfies all Brandie Backend Challenge requirements and is ready for evaluation.