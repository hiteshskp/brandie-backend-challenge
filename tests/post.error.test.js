// tests/post.error.test.js

const request = require('supertest');
const app = require('../app');
const { createPost, getUserPosts, getFeedPosts } = require('../models/postModel');

jest.mock('../models/postModel');

const token = 'Bearer faketoken';
const mockUserId = '00000000-0000-0000-0000-000000000001';

jest.mock('../middleware/authMiddleware', () => {
  return jest.fn((req, res, next) => {
    req.user = { userId: '00000000-0000-0000-0000-000000000001' };
    next();
  });
});

describe('Post API Error Handling', () => {
  it('should return 400 if both content and media are missing in post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', token)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Post must contain content or media');
  });

  it('should return 500 if getUserPosts throws error', async () => {
    getUserPosts.mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .get('/api/my-posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Failed to fetch user posts');
  });

  it('should return 500 if getFeedPosts throws error', async () => {
    getFeedPosts.mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .get('/api/feed')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Failed to fetch feed');
  });
});