const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use("/", postRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
