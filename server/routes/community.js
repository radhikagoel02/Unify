const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const communityControllers = require("../controllers/community");

router.post("/create", isAuth, communityControllers.postAddCommunity);

router.get("/:id", isAuth, communityControllers.getCommunityDetails);

router.patch("/promote", isAuth, communityControllers.promoteUser);

router.patch("/demote", isAuth, communityControllers.demoteCommunityAdmin);

router.patch(
  "/removeMember",
  isAuth,
  communityControllers.removeCommunityMember
);

router.post("/acceptRequest", isAuth, communityControllers.AcceptRequest);

router.post("/rejectRequest", isAuth, communityControllers.RejectRequest);

router.post("/editCommunity/:id", communityControllers.postEditCommunity);


module.exports = router;
