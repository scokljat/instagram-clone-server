const express = require("express");

const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");

const router = express.Router();

router.get("/posts", getPosts);

router.post("/posts", createPost);

router.delete("/posts/:id", deletePost);

router.patch("/posts/:id", updatePost);

module.exports = router;
