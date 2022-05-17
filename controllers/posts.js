const { PrismaClient } = require("@prisma/client");
const res = require("express/lib/response");

const prisma = new PrismaClient();

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { user: true, likes: true },
  });
  res.json(posts);
};

const createPost = async (req, res) => {
  const values = req.body;
  const post = await prisma.post.create({
    data: {
      description: values.description,
      url: values.url,
      user: {
        connect: { id: values.userId },
      },
    },
  });

  const createdPost = await prisma.post.findUnique({
    where: { id: post.id },
    include: {
      user: true,
      likes: {
        include: {
          user: true,
          post: true,
        },
      },
    },
  });
  res.json(createdPost);
};

const deletePost = async (req, res) => {
  const deletedLikes = await prisma.likes.deleteMany({
    where: { postId: req.body.postId },
  });

  const deletedPost = await prisma.post.delete({
    where: { id: req.body.postId },
  });
  res.status(200).send(deletedPost);
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const args = {
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      description: true,
      url: true,
      userId: true,
      user: true,
    },
    where: {
      id: Number(id),
    },
    data: { ...req.body },
  };

  const updatedPost = await prisma.post.update(args);

  res.status(200).send(updatedPost);
};

module.exports = { getPosts, createPost, deletePost, updatePost };
