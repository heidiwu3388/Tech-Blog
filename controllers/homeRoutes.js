const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["date_created", "DESC"]],
    });

    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to home page
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// GET /logout
// Log user out and redirect to home page
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(400).end();
  }
});

// GET Sign Up page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to home page
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// GET all posts for the signed-in user 
// and render dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
      order: [[Post, "date_created", "DESC"]],
    });
    // send error message if no user found
    if (!dbUserData) {
      res
        .status(404)
        .json({ message: `No user found with id=${req.session.userId}` });
      return;
    }
    // Serialize data so the template can read it
    const user = dbUserData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render("dashboard", { ...user, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post (with specified id) for the signed-in user
// and render edit page
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      }
    });
    // send error message if no post found
    if (!dbPostData) {
      res
      .status(404)
      .json({ message: `No post found with id=${req.params.id}` });
      return;
    }
    // Serialize data so the template can read it
    const post = dbPostData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render("editPost", { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET new post page
router.get("/dashboard/new", withAuth, async (req, res) => {
  res.render("newPost", { loggedIn: req.session.loggedIn });
});

module.exports = router;
