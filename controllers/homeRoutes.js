const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { posts, loggedIn: req.session.loggedIn }); 

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
