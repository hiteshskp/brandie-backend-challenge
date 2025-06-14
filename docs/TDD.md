# Technical Design Document  
**Project**: Social Media-Style Backend – Brandie Assignment  
**Engineer**: Hitesh Kumar  
**Date**: 13/06/2025

---

## 1. Objective  
Design and implement a minimal, scalable backend system that supports basic social media features such as user relationships (follow/unfollow), post creation, user feeds, and authentication. The system should expose clean RESTful APIs and use PostgreSQL as the data store.

---

## 2. Tech Stack

| Component      | Choice            | Reason                                                                 |
|----------------|-------------------|------------------------------------------------------------------------|
| Backend        | Node.js 18 + Express.js | Industry-standard, lightweight, and easy to scale                |
| Database       | PostgreSQL 15     | Relational, robust joins for user/post relationships                   |
| Auth           | JWT (JSON Web Tokens) | Stateless, easy to manage with middleware                          |
| Deployment     | Docker + Render/Railway | Easy to containerize and host quickly                            |
| Testing        | Postman + Jest (Optional) | Manual tests with optional unit testing support                |

---

## 3. Data Modeling

Create Dockerized PostgreSQL setup for project.

- Create docker-compose.yml in the project root
- Update .env to match

Start PostgreSQL

- docker-compose up -d
- docker ps 

Test DB connection using utils/db.js.
Result :: 

hiteshskp@Hiteshs-MacBook-Air brandie-backend-challenge % node utils/db.js

✅ Connected to PostgreSQL
Connected at: 2025-06-13T18:43:21.678Z

### Tables

#### `users`
| Column      | Type    | Description          |
|-------------|---------|----------------------|
| id (PK)     | UUID    | Unique user ID       |
| username    | String  | Unique name          |
| email       | String  | Auth + contact       |
| password    | String  | Hashed password      |
| created_at  | Date    | Timestamp            |

#### `posts`
| Column      | Type    | Description          |
|-------------|---------|----------------------|
| id (PK)     | UUID    | Unique post ID       |
| user_id     | UUID FK | Creator              |
| content     | Text    | Text content         |
| media_url   | String  | Optional media link  |
| created_at  | Date    | Post time            |

#### `follows`
| Column        | Type    | Description                  |
|---------------|---------|------------------------------|
| follower_id   | UUID FK | The user who follows         |
| following_id  | UUID FK | The user being followed      |
| created_at    | Date    | Time of action               |

---
## 4. API Endpoints

### **Auth**
- `POST /register` – Register a new user  
- `POST /login` – Login and get JWT token
  
### **User Relationships**
- `POST /follow/:userId` – Follow a user  
- `DELETE /unfollow/:userId` – Unfollow a user  
- `GET /followers` – List of users who follow you  
- `GET /following` – List of users you follow 

### **Posts**
- `POST /posts` – Create a post (text + media URL)  
- `GET /feed` – Timeline of posts from followed users  
- `GET /my-posts` – Your own posts  

---

## 5. Authentication Flow

- JWT issued on login
- Stored client-side (frontend, if used)
- Middleware `verifyToken` ensures access to protected routes
---

## 6. Testing Strategy

- Manual test cases via **Postman**
- Optional unit tests via **Jest**
- Test scenarios:
  - Register/Login
  - Follow/Unfollow logic
  - Post creation and retrieval
  - Feed accuracy (ordered by time)
  - Auth-protected route checks

---

## 7. Assumptions

- Media input is a URL string (uploading not required)
- No pagination required (MVP only)
- Posts are globally visible to followers
- All dates in UTC

---
