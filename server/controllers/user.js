const sequelize = require("../utils/database");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const user = await sequelize.query(
      `SELECT * FROM users WHERE id = '${userId}' AND isDeleted='0'`
    );
    if (!user) {
      const err = new Error();
      err.status = 403;
      throw err;
    }
    res.status(200).send(user[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const { status, id } = req.body;
  try {
    const user = await sequelize.query(
      `UPDATE users SET status = '${status}' WHERE id = '${id}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    if (!user) {
      const err = new Error();
      err.status = 403;
      throw err;
    }
    res.status(200).send("Status updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postEditUser = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image Provided");
    error.statusCode = 422;
    throw error;
  }
  const { userId } = req.params;
  const { email, name, gender, city, phoneNumber, dob } = req.body;
  const imageUrl = req.file.path;
  try {
    const user = await sequelize.query(
      `UPDATE users SET email='${email}',name='${name}',gender='${gender}',city='${city}',phoneNumber='${phoneNumber}',dob='${dob}',imgae=${imageUrl} WHERE id='${userId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    if (!user) {
      const err = new Error();
      err.status = 403;
      throw err;
    }
    res.status(200).send("User details edited successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  try {
    if (oldPassword === newPassword) {
      const err = new Error("New and old passwords should not be same");
      err.status = 401;
      throw err;
    }
    const oldPassword1 = await sequelize.query(
      `SELECT password FROM users WHERE id = '${userId} AND isDeleted='0'`
    );
    if (oldPassword === oldPassword1) {
      const res = await sequelize.query(
        `UPDATE users SET password=${newPassword}`,
        { type: QueryTypes.UPDATE }
      );
    } else {
      const err = new Error("Enter your old password correctly");
      err.status = 401;
      throw err;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loadedUser = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}" AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!loadedUser) {
      const error = new Error("Please input your correct email and password");
      error.status = 401;
      throw error;
    }
    // const doMatch = await bcrypt.compare(password, loadedUser[0].password);
    // if (doMatch) {
    //   const token = jwt.sign(
    //     { email: loadedUser.email, id: loadedUser.id },
    //     "your-unify-project-secret",
    //     { expiresIn: "1h" }
    //   );
    if (loadedUser[0].password === password) {
      const token = jwt.sign(
        { email: loadedUser[0].email, id: loadedUser[0].id },
        "your-unify-project-secret",
        { expiresIn: "1h" }
      );
      //TODO: mail and reset password
      res.status(200).send({
        user: loadedUser[0],
        token: token,
      });
    } else {
      const error = new Error(
        "Please input your correct username and password"
      );
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLeaveCommunity = async (req, res, next) => {
  const { userId, communityId } = req.body;
  try {
    await sequelize.query(
      `DELETE FROM community_members WHERE userId=${userId} AND communityId=${communityId}`,
      {
        type: QueryTypes.DELETE,
      }
    );
    res.status(204).send();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postJoin = async (req, res, next) => {
  const userId = req.body.userId;
  const communityId = req.params.id;
  try {
    const communityRule = await sequelize.query(
      `SELECT rule FROM communities WHERE id='${communityId}'  AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (communityRule[0].rule === "direct") {
      const response = await sequelize.query(
        `INSERT INTO community_members(communityRole,userId,communityId) VALUES("user",${userId},${communityId})`,
        {
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).send("Added as Member");
    } else {
      const response = await sequelize.query(
        `INSERT INTO requests (userId,communityId) VALUES(${userId},${communityId})`,
        {
          type: QueryTypes.INSERT,
        }
      );
    }
    res.status(200).send("Join request handled sucessfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.cancelRequest = async (req, res, next) => {
  let communityId = req.params.id;
  let userId = req.body.userId;
  try {
    await sequelize.query(
      `DELETE FROM requests WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.DELETE,
      }
    );
    res.status(200).send("Request cancelled sucessfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCommunitiesNotJoined = async (req, res, next) => {
  let userId = req.query.userId;
  try {
    const notJoined = await sequelize.query(
      `SELECT communities.* FROM communities WHERE NOT id IN (SELECT community_members.communityId FROM communities JOIN community_members ON community_members.communityId=communities.id AND community_members.userId='${userId}' UNION SELECT requests.communityId FROM communities JOIN requests ON requests.communityId=communities.id AND requests.userId='${userId}');`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!notJoined) {
      const err = new Error("No community found");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).send(notJoined);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//TODO: community panel bas ismein count ka dekhna h
exports.getUserCommunities = async (req, res, next) => {
  let userId = req.query.userId;
  try {
    const joined = await sequelize.query(
      `SELECT communities.*,community_members.communityRole FROM communities JOIN community_members ON community_members.communityId=communities.id AND community_members.userId='${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    let communitiesJoined = [];
    communitiesJoined = joined.map((community) => {
      if (community.communityRole == "owner") {
        community["type"] = "owned";
      } else {
        community["type"] = "joined";
      }
      return community;
    });
    const requested = await sequelize.query(
      `SELECT communities.* FROM communities JOIN requests ON requests.communityId=communities.id AND requests.userId='${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    let communitiesRequestedToJoin = [];
    communitiesRequestedToJoin = requested.map((community) => {
      community["type"] = "requested";
      return community;
    });
    let userCommunities = [...communitiesJoined, ...communitiesRequestedToJoin];
    res.status(200).send(userCommunities);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
