const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts/:id 
router.get('/:id', withAuth, async (req, res) => {
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
      order: [[Comment, 'date_created', 'DESC']]
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
    console.log("post: ", post);
    // Pass serialized data and session flag into template
    res.render('post_comments', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/posts
// create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });
    // redirect to dashboard if successful creation of new post
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
