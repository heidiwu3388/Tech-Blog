const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// route to /api/users
router.use('/users', userRoutes);

// route to /api/posts
router.use('/posts', postRoutes);

module.exports = router;
