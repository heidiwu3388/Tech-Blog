const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// route to /api/users
router.use('/users', userRoutes);

// route to /api/posts
router.use('/posts', postRoutes);

// route to /api/comments
router.use('/comments', commentRoutes);


module.exports = router;
