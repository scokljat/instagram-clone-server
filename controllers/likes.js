const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const likePost = async (req, res) => {
  const values = req.body;
  const liked = await prisma.likes.create({
    data: {
      post: {
        connect: { id: values.postId },
      },
      user: {
        connect: { id: values.userId },
      },
    },
  });

  res.json(liked);
};

const getLikes = async (req, res) => {
  const likes = await prisma.likes.findMany();
  res.json(likes);
};

module.exports = { likePost, getLikes };
