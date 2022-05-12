const express = require("express");

const { getPosts, createPost, deletePost } = require("../controllers/posts");

const router = express.Router();

router.get("/posts", getPosts);

router.post("/posts", createPost);

router.delete("/posts/:id", deletePost);

module.exports = router;
