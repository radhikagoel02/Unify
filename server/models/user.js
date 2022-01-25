const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("super-admin", "admin", "user"),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("confirmed", "pending"),
    allowNull: false,
    defaultValue: "pending",
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  gender: Sequelize.ENUM("male", "female", "other"),
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: Sequelize.STRING,
  dob: Sequelize.DataTypes.DATEONLY,
});

module.exports = User;
