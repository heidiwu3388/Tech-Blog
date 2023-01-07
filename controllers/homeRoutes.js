const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

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
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
      order: [[Post, "date_created", "DESC"]],
    });
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
module.exports = router;
