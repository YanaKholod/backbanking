const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { phone, password, fullName } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
  }

  if (fullName) {
    user.fullName = fullName;
  }

  await user.save();

  res.json({
    phone: user.phone,
    fullName: user.fullName,
    role: user.role,
  });
};

module.exports = updateUser;