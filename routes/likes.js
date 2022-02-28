const express = require("express");
const { likePost } = require("../controllers/likes");

const router = express.Router();

router.post("/like", likePost);

module.exports = router;
