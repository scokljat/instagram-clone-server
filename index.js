const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res, next) => {
  const posts = await prisma.post.findMany({ include: { user: true } });
  res.json({ posts });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`htttp://localhost:${PORT}`));
