const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CommunityMember = sequelize.define("community_member", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  communityRole: {
    type: Sequelize.ENUM("admin", "user", "owner"),
    allowNull: false,
  },
});

module.exports = CommunityMember;
