const Sequelize = require("sequelize");

const sequelize = new Sequelize("unify", "root", "2002&Rr", {
  dialect: "mysql",
  host: "localhost",
  define: {
    updatedAt: false,
    createdAt: false,
  },
});

module.exports = sequelize;
