# 🧾 Technical Design Document  
**Project**: Social Media-Style Backend – Brandie Assignment  
**Engineer**: Hitesh Kumar  
**Date**: 13/06/2025

---

## 1. 🎯 Objective  
Design and implement a minimal, scalable backend system that supports basic social media features such as user relationships (follow/unfollow), post creation, user feeds, and authentication. The system should expose clean RESTful APIs and use PostgreSQL as the data store.

---

## 2. ⚙️ Tech Stack

| Component      | Choice            | Reason                                                                 |
|----------------|-------------------|------------------------------------------------------------------------|
| Backend        | Node.js 18 + Express.js | Industry-standard, lightweight, and easy to scale                |
| Database       | PostgreSQL 15     | Relational, robust joins for user/post relationships                   |
| Auth           | JWT (JSON Web Tokens) | Stateless, easy to manage with middleware                          |
| Deployment     | Docker + Render/Railway | Easy to containerize and host quickly                            |
| Testing        | Postman + Jest (Optional) | Manual tests with optional unit testing support                |

---

## 3. 📐 Data Modeling

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
