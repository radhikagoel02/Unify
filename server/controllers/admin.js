const sequelize = require("../utils/database");
const { QueryTypes } = require("sequelize");

exports.postAddUser = async ({ body }, res, next) => {
  const { email, password, phoneNumber, city, role } = body;
  try {
    const user = await sequelize.query(
      `INSERT INTO users (email,password,phoneNumber,city,role) VALUES ('${email}','${password}','${phoneNumber}','${city}','${role}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).send("Inserted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await sequelize.query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    });
    if (!users) {
      res.status(401).send("No users found");
    }
    res.status(200).send(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCommunities = async (req, res, next) => {
  try {
    const communities = await sequelize.query(
      "SELECT communities.*,users.name AS ownerName FROM communities INNER JOIN users on communities.ownerId=users.id",
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!communities) {
      res.send("No community found");
    }
    res.status(200).send(communities);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postEditCommunity = async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const communityFound = await sequelize.query(
      `SELECT * FROM communities WHERE id = '${communityId} AND isDeleted='0''`,
      { type: QueryTypes.SELECT }
    );
    if (!communityFound) {
      throw err.status(403);
    }
    const { name, description, image } = req.body;
    const editedCommunity = await sequelize.query(
      `UPDATE communities SET name='${name}',description='${description}',image='${image}' WHERE id='${communityId}'`,
      { type: QueryTypes.UPDATE }
    );
    res.statusCode(200).end();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postEditUser = async (req, res, next) => {
  const editingUser = req.body.newDetails;
  const editingUserId = req.body.editingUserId;
  try {
    const user = await sequelize.query(
      `SELECT * FROM users WHERE id = '${editingUserId}' AND isDeleted='0'`,
      { type: QueryTypes.SELECT }
    );
    if (!user) {
      const err = new Error();
      err.status = 403;
      throw err;
    }
    const editedUser = await sequelize.query(
      `UPDATE users SET email='${editingUser.email}',phoneNumber='${editingUser.phoneNumber}',city='${editingUser.city}',role='${editingUser.role}' WHERE id='${editingUserId}'`,
      { type: QueryTypes.UPDATE }
    );
    res.status(200).send("Edit sucess");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.activateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { userRole, toDelete } = req.body;
  try {
    const user = await sequelize.query(
      `SELECT * FROM users WHERE id='${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!user) {
      const err = new Error("No such user found");
      err.statusCode = 403;
      throw err;
    }
    if (userRole === "admin" && user.role !== "user") {
      const err = newError("You can't perform this action");
      err.statusCode = 401;
      throw err;
    }
    const result = await sequelize.query(
      `UPDATE users SET isDeleted='${toDelete}' WHERE id='${userId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send("User deleted");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.activateCommunity = async (req, res, next) => {
  const communityId = req.params.id;
  const { userRole, toDelete } = req.body;
  try {
    const community = await sequelize.query(
      `SELECT * FROM communities WHERE id='${communityId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!community) {
      const err = new Error("No such community found");
      err.statusCode = 403;
      throw err;
    }
    const result = await sequelize.query(
      `UPDATE communities SET isDeleted='${toDelete}' WHERE id='${communityId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).send("User deleted");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSearchedUser = async (req, res, next) => {
  try {
    const term = req.query.term;
    const searchedUsers = await sequelize.query(
      `SELECT * FROM users WHERE EMAIL LIKE '%${term}%' AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send(searchedUsers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSearchedCommunity = async (req, res, next) => {
  try {
    const term = req.query.term;
    const communities = await sequelize.query(
      `SELECT * FROM communities WHERE NAME LIKE '%${term}%'  AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).send(communities);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
