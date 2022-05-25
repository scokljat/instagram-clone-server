const express = require("express");
const { likePost, getLikes, dislikePost } = require("../controllers/likes");

const router = express.Router();

router.get("/likes", getLikes);

router.post("/likes", likePost);

router.post("/dislikes", dislikePost);

module.exports = router;
