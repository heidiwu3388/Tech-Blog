const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/comments (create a new comment)
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body, // text, post_id
      user_id: req.session.userId
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
