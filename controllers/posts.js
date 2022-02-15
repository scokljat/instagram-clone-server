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

const deletePost = async (req, res) => {
  const id = req.params.id;

  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedPost);
};

module.exports = { getPosts, createPost, deletePost };
