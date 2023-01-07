const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// GET /api/posts/:id 
router.get('/:id', async (req, res) => {
  try {
    // Get single post with given id and JOIN with Comment data
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      include: [ 
        { model: Comment, 
          attributes: ['text', 'user_id', 'date_created'],
          include: { model: User, attributes: ['name'] }
        },
        { model: User, 
          attributes: ['name']
        }
      ],
    });
    // send error if no post found
    if (!dbPostData) {
      res
        .status(404)
        .json({ message: `No post found with id=${req.params.id}` });
      return;
    }
    // Serialize data so the template can read it
    const post = dbPostData.get({ plain: true });
    console.log(post);
    // Pass serialized data and session flag into template
    res.render('post_comments', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
