const express = require("express");

const { getUsers, createUser, deleteUser } = require("../controllers/users");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
