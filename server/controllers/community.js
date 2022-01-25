const sequelize = require("../utils/database");
const { QueryTypes } = require("sequelize");

exports.postAddCommunity = async (req, res, next) => {
  const { name, rule, image, description } = req.body.communitiesDetails;
  const { userId } = req.body;
  let date = new Date();
  try {
    const newCommunity = await sequelize.query(
      `INSERT INTO communities (userId,name,rule,image,description,isDeleted,ownerId,createdAt) VALUES('${req.user.id}','${name}','${rule}','${image}','${description}','0','${userId}','${date}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    const addOwner = await sequelize.query(
      `INSERT INTO community_members VALUES('owner','${newCommunity.id}','${userId}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).send("Community created succesfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCommunity = async (req, res, next) => {
  const communityId = req.params.id;
  try {
    const fetchedCommunity = await sequelize.query(
      `SELECT * FROM communities WHERE id = '${communityId}'  AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!fetchedCommunity) {
      const error = new Error("Could not find the community.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send(fetchedCommunity[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCommunityDetails = async (req, res, next) => {
  const { id } = req.params;
  const communityId = id;
  const { userId } = req.query;
  try {
    const fetchedCommunity = await sequelize.query(
      `SELECT * FROM communities WHERE id = '${communityId}'  AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!fetchedCommunity) {
      const error = new Error("Could not find the community.");
      error.statusCode = 404;
      throw error;
    }
    const members = await sequelize.query(
      `SELECT users.*,community_members.communityRole FROM users JOIN community_members ON community_members.userId=users.id AND community_members.communityId='${communityId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!members) {
      const err = new Error("No member found");
      err.statusCode = 401;
      throw err;
    }

    const requests = await sequelize.query(
      `SELECT users.* FROM users JOIN requests ON requests.userId=users.id AND requests.communityId='${communityId}'`,
      { type: QueryTypes.SELECT }
    );

    let joined = false;
    let adminmembers = members.filter(
      (member) => member.communityRole !== "user"
    );
    let userMembers = members.filter(
      (member) => member.communityRole === "user"
    );

    let userCommunityRole = "";
    const currentUser = members.filter(
      (user) => user.id == parseInt(userId)
    )[0];
    if (currentUser !== undefined) {
      joined = true;
      userCommunityRole = currentUser.communityRole;
    }
    res.status(200).send({
      communityData: fetchedCommunity[0],
      allMembers: members,
      communityAdminMembers: adminmembers,
      communityUserMembers: userMembers,
      communityJoined: joined,
      userCommunityRole: userCommunityRole,
      requestsToJoin: requests,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
//TODO: get members

exports.AcceptRequest = async (req, res, next) => {
  const { userId, communityId } = req.body;
  try {
    await sequelize.query(
      `DELETE FROM requests WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.DELETE,
      }
    );
    let memberAdded = await sequelize.query(
      `INSERT INTO community_members(communityRole,userId,communityId) VALUES("user",${userId},${communityId})`,
      {
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).send(memberAdded);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.RejectRequest = async (req, res, next) => {
  const { userId, communityId } = req.body;
  try {
    await sequelize.query(
      `DELETE FROM requests WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.DELETE,
      }
    );
    res.status(200).send("Requested rejected successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//TODO: delete community
exports.postDeleteCommunity = async (req, res, next) => {
  const userId = req.body.userId;
  const communityId = req.params.id;
  try {
    const ownerId = await sequelize.query(
      `SELECT ownerId FROM communities WHERE id='${communityId}' AND isDeleted='0'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (!ownerId[0].ownerId) {
      throw err.status(401);
    }
    if (ownerId === userId) {
      const result = await sequelize.query(
        `UPDATE communities SET isDeleted='1' WHERE id='${communityId}'`,
        {
          type: QueryTypes.UPDATE,
        }
      );
    }
    res.status(200).send("Community deletd succesfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.promoteUser = async (req, res, next) => {
  const { communityId, userId } = req.body;
  try {
    const user = await sequelize.query(
      `UPDATE community_members SET communityRole='admin' WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    if (!user) {
      const err = new Error("No member found");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).send("Promoted");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.demoteCommunityAdmin = async (req, res, next) => {
  const { communityId, userId } = req.body;
  try {
    const user = await sequelize.query(
      `UPDATE community_members SET communityRole='user' WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    if (!user) {
      const err = new Error("No member found");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).send("Demoted");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeCommunityMember = async (req, res, next) => {
  const { userId, communityId } = req.body;
  try {
    await sequelize.query(
      `DELETE FROM community_members WHERE userId='${userId}' AND communityId='${communityId}'`,
      {
        type: QueryTypes.DELETE,
      }
    );
    res.status(200).send("Community Member deleted successfully");
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
    const { name, rule, image, description } = req.body.communitiesDetails;
    const { userId } = req.body;
    const communityFound = await sequelize.query(
      `SELECT * FROM communities WHERE id = '${communityId}'  AND isDeleted='0'`,
      { type: QueryTypes.SELECT }
    );
    if (!communityFound) {
      const err = new Error("no such cmmunity found");
      err.statusCode = 403;
      throw err;
    }
    if (communityFound.ownerId === userId) {
      const editedCommunity = await sequelize.query(
        `UPDATE communities SET name='${name}',description='${description}',image='${image}',rule='${rule}' WHERE id='${communityId}'`,
        { type: QueryTypes.UPDATE }
      );
      res.statusCode(200).end("edited sucessfully");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  const { name, rule, image, description } = req.body.communitiesDetails;
  const { userId } = req.body;
  try {
    const newCommunity = await sequelize.query(
      `INSERT INTO communities (userId,name,rule,image,description,isDeleted,ownerId) VALUES(${req.user.id},${name},${rule},${image},${description},'0',${userId})`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(201).send("Community created succesfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//TODO: promote user to communityadmin
