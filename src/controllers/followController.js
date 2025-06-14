const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../models/followModel');

const follow = async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.userId;

  if (followerId === followingId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    await followUser(followerId, followingId);
    res.status(200).json({ message: 'Followed user successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Follow failed' });
  }
};

const unfollow = async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.userId;

  try {
    await unfollowUser(followerId, followingId);
    res.status(200).json({ message: 'Unfollowed user successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unfollow failed' });
  }
};

const followers = async (req, res) => {
  try {
    const result = await getFollowers(req.user.userId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch followers' });
  }
};

const following = async (req, res) => {
  try {
    const result = await getFollowing(req.user.userId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch following list' });
  }
};

module.exports = { follow, unfollow, followers, following };
