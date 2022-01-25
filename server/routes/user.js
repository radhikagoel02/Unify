const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const userControllers = require("../controllers/user");

router.get("/getUser", isAuth, userControllers.getUser);

router.post("/user/edit", isAuth, userControllers.postEditUser);

router.post("/user/statusUpdate", isAuth, userControllers.updateStatus);

router.post("/login", userControllers.login);

router.post("/leaveCommunity", isAuth, userControllers.postLeaveCommunity);

// router.post("/changepassword", userControllers.changePassword);

router.get("/communitypanel", isAuth, userControllers.getUserCommunities);

router.get("/findCommunities", isAuth, userControllers.getCommunitiesNotJoined);

router.post("/cancelRequest/:id", isAuth, userControllers.cancelRequest);

router.post("/join/:id", isAuth, userControllers.postJoin);

module.exports = router;
