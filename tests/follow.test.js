const request = require('supertest');
const app = require('../app');
const pool = require('../utils/db');

let token1, token2, user2Id;

beforeAll(async () => {
  await request(app).post('/api/auth/register').send({
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1'
  });

  await request(app).post('/api/auth/register').send({
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2'
  });

  const res1 = await request(app).post('/api/auth/login').send({
    email: 'user1@example.com',
    password: 'password1'
  });
  token1 = res1.body.token;

  const res2 = await request(app).post('/api/auth/login').send({
    email: 'user2@example.com',
    password: 'password2'
  });
  token2 = res2.body.token;

  const user2 = await pool.query('SELECT id FROM users WHERE email = $1', ['user2@example.com']);
  user2Id = user2.rows[0].id;
});

afterAll(async () => {
  await pool.query('DELETE FROM follows');
  await pool.query('DELETE FROM users WHERE email IN ($1, $2)', ['user1@example.com', 'user2@example.com']);
  await pool.end();
});

describe('Follow API', () => {
  it('should follow another user', async () => {
    const res = await request(app)
      .post(`/api/user/follow/${user2Id}`)
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Followed user successfully');
  });

  it('should return following list', async () => {
    const res = await request(app)
      .get('/api/user/following')
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return followers list', async () => {
    const res = await request(app)
      .get('/api/user/followers')
      .set('Authorization', `Bearer ${token2}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should unfollow a user', async () => {
    const res = await request(app)
      .delete(`/api/user/unfollow/${user2Id}`)
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Unfollowed user successfully');
  });

  it('should not allow a user to follow themselves', async () => {
    const res = await request(app)
      .post(`/api/user/follow/${user2Id}`)
      .set('Authorization', `Bearer ${token2}`); // user2 trying to follow themselves
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("You can't follow yourself");
  });
});

describe('Auth Middleware Edge Cases', () => {
  it('should return 401 if Authorization header is missing', async () => {
    const res = await request(app)
      .get('/api/user/following');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Missing or invalid token');
  });

  it('should return 403 if token is invalid or expired', async () => {
    const res = await request(app)
      .get('/api/user/following')
      .set('Authorization', 'Bearer invalid.token.here');
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid token');
  });
});
