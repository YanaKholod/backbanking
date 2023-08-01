const { HttpError } = require("../../helpers");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  console.log("Received a request to register:", req.body);

  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (user) {
    throw new HttpError(409, "Phone number in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    role: "user",
  });

  res.status(201).json({
    phone: newUser.phone,
    fullName: newUser.fullName,
    role: newUser.role,
  });
};

module.exports = register;
