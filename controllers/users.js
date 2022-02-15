const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
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

module.exports = { getUsers, createUser, deleteUser };
