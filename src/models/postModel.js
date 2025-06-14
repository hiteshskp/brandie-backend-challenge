const pool = require('../config/db');

const createPost = async (userId, content, mediaUrl) => {
  const res = await pool.query(
    `INSERT INTO posts (user_id, content, media_url) 
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, content, mediaUrl]
  );
  return res.rows[0];
};

const getUserPosts = async (userId) => {
  const res = await pool.query(
    `SELECT id, content, media_url, created_at FROM posts 
     WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return res.rows;
};

const getFeedPosts = async (userId) => {
  const res = await pool.query(
    `SELECT p.id, p.content, p.media_url, p.created_at, u.username
     FROM posts p
     JOIN follows f ON p.user_id = f.following_id
     JOIN users u ON u.id = p.user_id
     WHERE f.follower_id = $1
     ORDER BY p.created_at DESC`,
    [userId]
  );
  return res.rows;
};

module.exports = { createPost, getUserPosts, getFeedPosts };
