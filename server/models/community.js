const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Community = sequelize.define("community", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rule: {
    type: Sequelize.ENUM("permission", "direct"),
    allowNull: false,
  },

  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  image: Sequelize.STRING,
  description: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATEONLY,
    default: new Date().toLocaleDateString(),
    allowNull: false,
  },
  // totalMembers: {
  //   type: Sequelize.NUMBER,
  //   allowNull: false,
  //   default: 1,
  // },
});

module.exports = Community;
