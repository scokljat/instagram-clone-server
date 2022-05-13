const express = require("express");
const { likePost, getLikes } = require("../controllers/likes");

const router = express.Router();

router.get("/likes", getLikes);

router.post("/likes", likePost);

module.exports = router;
