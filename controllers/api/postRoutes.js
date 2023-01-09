const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts/:id 
// get a single post with comments
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
    res.render('post_comments', { post, loggedIn: req.session.loggedIn, userName: req.session.userName });
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
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /api/posts/:id
// update a post's title or content by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    // update post data
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { 
          id: req.params.id,
          user_id: req.session.userId
        }
      });
      // send error message if post update unsucessfull
      if (!dbPostData[0]) {
        res.status(404).json({ message: `Failed to update post id=${req.params.id}` });
        return;
      }
      // send success message
      res.status(200).json(dbPostData);
    } catch (err) {
      // send error message
      res.status(500).json(err);
    }
  });
  
  // DELETE /api/posts/:id
  // delete a post by id
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      // delete post
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.userId
        } 
      });
      console.log(dbPostData);
      // send error message if post delete unsucessfull
      if (!dbPostData) {
        res.status(404).json({ message: `Failed to delete post id=${req.params.id}` });
        return;
      }
      // send success message
      res.status(200).json(dbPostData);
    } catch (err) {
      // send error message
      res.status(500).json(err);
    }
  });


  module.exports = router;
