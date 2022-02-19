const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const {
  registerValidation,
  loginValidation,
} = require("../Validation/validation");

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (emailExist) return res.status(400).send("Email already exists");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...req.body,
      password: hashedPassword,
    },
  });
  res.json(newUser);
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) return res.status(400).send("Email is not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

module.exports = { registerUser, loginUser };
