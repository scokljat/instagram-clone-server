const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    userName: Joi.string().min(5).required(),
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
