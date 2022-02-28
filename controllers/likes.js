const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const likePost = async (values) => {
  const likedPost = await prisma.likes.create(values);
  return likedPost;
};

module.exports = { likePost };
