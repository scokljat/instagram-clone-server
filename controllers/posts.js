const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({ include: { user: true } });
  res.json({ posts });
};

const createPost = async (req, res) => {
  const post = await prisma.post.create({
    data: {
      ...req.body,
    },
  });
  res.json(post);
};

module.exports = { getPosts, createPost };
