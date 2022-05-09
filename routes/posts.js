const express = require("express");

const {
  getPosts,
  createPost,
  deletePost,
  getPostsbyUserId,
} = require("../controllers/posts");

const router = express.Router();

router.get("/", getPosts);
router.get("/posted/:id", getPostsbyUserId);

router.post("/", createPost);

router.delete("/:id", deletePost);

module.exports = router;
