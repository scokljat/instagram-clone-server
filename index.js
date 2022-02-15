const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

//const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use("/", postRoutes);
app.use("/users", userRoutes);

//const router = express.Router();
//const prisma = new PrismaClient();

//app.post("/users", async (req, res) => {
//const newuser = await prisma.user.create({
//data: {
//...req.body,
//},
//});
//res.json(newuser);
//});
//app.post("/", async (req, res) => {
//const post = await prisma.post.create({
//data: {
//...req.body,
//},
//});
//res.json(post);
//});
// app.get("/", async (req, res) => {
//   const posts = await prisma.post.findMany({ include: { user: true } });
//   res.json({ posts });
// });
// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json({ users });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
