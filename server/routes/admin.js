const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const adminControllers = require("../controllers/admin");

router.post("/addUser", isAuth, adminControllers.postAddUser);

router.get("/userList", isAuth, adminControllers.getUsers);

router.get("/communityList", isAuth, adminControllers.getCommunities);

router.get("/userList/search", isAuth, adminControllers.getSearchedUser);

router.get(
  "/communityList/search",
  isAuth,
  adminControllers.getSearchedCommunity
);

router.post("/userList/delete/:id", isAuth, adminControllers.activateUser);

router.post(
  "/communityList/delete/:id",
  isAuth,
  adminControllers.activateCommunity
);

router.post("/editUser", isAuth, adminControllers.postEditUser);

router.post("/editCommunity", isAuth, adminControllers.postEditCommunity);

module.exports = router;
