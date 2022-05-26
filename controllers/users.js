const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send({ users });
};

const getUserById = async (req, res) => {
  id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.status(200).send(user);
};

const createUser = async (req, res) => {
  const newuser = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).send(newuser);
};

const deleteUser = async (req, res) => {
  const deletedUserLikes = await prisma.likes.deleteMany({
    where: { userId: req.body.userId },
  });

  const userPosts = await prisma.post.findMany({
    where: { userId: req.body.userId },
  });

  const array = [];

  for (var i = 0; i < userPosts.length; i++) {
    array.push(userPosts[i].id);
  }

  const deletedPostLikes = await prisma.likes.deleteMany({
    where: {
      postId: {
        in: array,
      },
    },
  });

  const deletedPosts = await prisma.post.deleteMany({
    where: { userId: req.body.userId },
  });

  const deletedUser = await prisma.user.delete({
    where: { id: req.body.userId },
  });

  res.status(200).send(deletedUser);
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const existingUsername = await prisma.user.findUnique({
    where: { userName: req.body.userName },
  });
  if (existingUsername !== null && existingUsername.id !== userId) {
    return res.status(400).send({ exception: "Username is already in use!" });
  }

  const args = {
    select: {
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      password: true,
      image: true,
    },
    where: {
      id: Number(userId),
    },
    data: { ...req.body, password: hashedPassword },
  };

  const user = await prisma.user.update(args);
  return res.status(200).send(user);
};

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
