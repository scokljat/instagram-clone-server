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

router.delete("/users/:id", deleteUser);

router.patch("/users/update", updateUser);

module.exports = router;
