const Joi = require("joi");
const { ukrainePhoneRegex } = require("../constants/users");

const registerSchema = Joi.object({
  phone: Joi.string().pattern(ukrainePhoneRegex).required(),
  password: Joi.string().required(),
  fullName: Joi.string().trim().min(6).max(100).required(),
});

const loginSchema = Joi.object({
  phone: Joi.string().pattern(ukrainePhoneRegex).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  phone: Joi.string().pattern(ukrainePhoneRegex).required(),
  password: Joi.string().required(),
  fullName: Joi.string().trim().min(6).max(100).required(),
});
const schemas = { registerSchema, loginSchema, updateSchema };

module.exports = { schemas };
