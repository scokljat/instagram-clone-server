const express = require("express");

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/users");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.post("/users/delete-user", deleteUser);

router.patch("/users/:id", updateUser);

module.exports = router;
