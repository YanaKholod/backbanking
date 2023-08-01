const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../helpers");
const User = require("../../models/user");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (!user) {
    throw new HttpError(401, "Phone number or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new HttpError(401, "Phone number or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

module.exports = login;
