const { createPost, getUserPosts, getFeedPosts } = require('../models/postModel');

const addPost = async (req, res) => {
  const userId = req.user.userId;
  const { content, mediaUrl } = req.body;

  if (!content && !mediaUrl) {
    return res.status(400).json({ message: 'Post must contain content or media' });
  }

  try {
    const newPost = await createPost(userId, content, mediaUrl);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

const myPosts = async (req, res) => {
  try {
    const posts = await getUserPosts(req.user.userId);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
};

const feed = async (req, res) => {
  try {
    const posts = await getFeedPosts(req.user.userId);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch feed' });
  }
};

module.exports = { addPost, myPosts, feed };
