const pool = require('../utils/db');

const followUser = async (followerId, followingId) => {
  await pool.query(
    'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [followerId, followingId]
  );
};

const unfollowUser = async (followerId, followingId) => {
  await pool.query(
    'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
    [followerId, followingId]
  );
};

const getFollowers = async (userId) => {
  const res = await pool.query(
    `SELECT u.id, u.username FROM follows
     JOIN users u ON u.id = follows.follower_id
     WHERE follows.following_id = $1`,
    [userId]
  );
  return res.rows;
};

const getFollowing = async (userId) => {
  const res = await pool.query(
    `SELECT u.id, u.username FROM follows
     JOIN users u ON u.id = follows.following_id
     WHERE follows.follower_id = $1`,
    [userId]
  );
  return res.rows;
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
