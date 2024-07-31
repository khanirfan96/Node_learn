const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUseByID,
  handleDeleteUserByID,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUseByID)
  .delete(handleDeleteUserByID);

module.exports = router;
