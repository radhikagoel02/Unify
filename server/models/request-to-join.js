const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const RequestToJoin = sequelize.define("request", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = RequestToJoin;
