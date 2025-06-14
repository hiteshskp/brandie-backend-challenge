const request = require('supertest');
const app = require('../app');
const pool = require('../utils/db');

let token, userId;

beforeAll(async () => {
  // Register test user
  await request(app).post('/api/auth/register').send({
    username: 'poster',
    email: 'poster@example.com',
    password: 'postpass'
  });

  // Login test user
  const res = await request(app).post('/api/auth/login').send({
    email: 'poster@example.com',
    password: 'postpass'
  });

  token = res.body.token;

  const user = await pool.query('SELECT id FROM users WHERE email = $1', ['poster@example.com']);
  userId = user.rows[0].id;
});

afterAll(async () => {
  await pool.query('DELETE FROM posts');
  await pool.query('DELETE FROM users WHERE email = $1', ['poster@example.com']);
  await pool.end();
});

describe('Posts API', () => {
  it('should create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Hello from Jest!',
        mediaUrl: 'https://example.com/img.jpg'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not allow empty post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Post must contain content or media');
  });

  it('should return my posts', async () => {
    const res = await request(app)
      .get('/api/my-posts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return empty feed (no follows)', async () => {
    const res = await request(app)
      .get('/api/feed')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
