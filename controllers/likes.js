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

  const post = await prisma.post.findUnique({
    where: { id: values.postId },
    include: { user: true, likes: true },
  });
  res.status(200).send(post);
};

const getLikes = async (req, res) => {
  const likes = await prisma.likes.findMany();
  res.status(200).send(likes);
};

const dislikePost = async (req, res) => {
  const values = req.body;
  const disliked = await prisma.likes.deleteMany({
    where: { postId: req.body.postId, userId: req.body.userId },
  });

  const post = await prisma.post.findUnique({
    where: { id: values.postId },
    include: { user: true, likes: true },
  });
  res.status(200).send(post);
};

module.exports = { likePost, getLikes, dislikePost };
