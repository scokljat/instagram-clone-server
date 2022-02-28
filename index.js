const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const likeRoutes = require("./routes/likes");

const app = express();

app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use(postRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(likeRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
