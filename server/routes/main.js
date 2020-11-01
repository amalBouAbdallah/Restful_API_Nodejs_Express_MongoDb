const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.Controller");
const router = express.Router();
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:userId", getSingleUser);
router.patch("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
module.exports = router;
