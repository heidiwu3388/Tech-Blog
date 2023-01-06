const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed data for the table "user"
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seed data for the table "post"
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // seed data for the table "comment"
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: Math.floor(Math.random() * userData.length) + 1,
      post_id: Math.floor(Math.random() * postData.length) + 1,
    });
  }

  process.exit(0);
};

seedDatabase();
