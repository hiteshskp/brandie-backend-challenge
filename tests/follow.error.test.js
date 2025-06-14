const request = require('supertest');
const app = require('../app');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

jest.mock('../models/followModel', () => ({
  followUser: jest.fn(() => { throw new Error('DB error'); }),
  unfollowUser: jest.fn(() => { throw new Error('DB error'); }),
  getFollowers: jest.fn(() => { throw new Error('DB error'); }),
  getFollowing: jest.fn(() => { throw new Error('DB error'); })
}));

// Use different IDs to avoid self-follow check
const token1 = sign({ userId: '11111111-1111-1111-1111-111111111111' }, process.env.JWT_SECRET);
const targetId = '22222222-2222-2222-2222-222222222222';

describe('Follow API Error Handling', () => {
  it('should return 500 if followUser throws error', async () => {
    const res = await request(app)
      .post(`/api/user/follow/${targetId}`)
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Follow failed');
  });

  it('should return 500 if unfollowUser throws error', async () => {
    const res = await request(app)
      .delete(`/api/user/unfollow/${targetId}`)
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Unfollow failed');
  });

  it('should return 500 if getFollowers throws error', async () => {
    const res = await request(app)
      .get('/api/user/followers')
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Failed to fetch followers');
  });

  it('should return 500 if getFollowing throws error', async () => {
    const res = await request(app)
      .get('/api/user/following')
      .set('Authorization', `Bearer ${token1}`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Failed to fetch following list');
  });
});