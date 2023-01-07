const router = require('express').Router();
const userRoutes = require('./userRoutes');

// route to /api/users
router.use('/users', userRoutes);

module.exports = router;
