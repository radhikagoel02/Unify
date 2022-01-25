const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  featured: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  global: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  description: Sequelize.STRING,
});

module.exports = Post;
