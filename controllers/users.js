const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

const getUserById = async (req, res) => {
  id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
};

const createUser = async (req, res) => {
  const newuser = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(newuser);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
  return res.json(user);
};

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
