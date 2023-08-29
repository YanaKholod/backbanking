const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { id, card } = req.body;

  const user = await User.findOne({ _id:id });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (card) {
    user.cards.push(card);
  }

  await user.save();

  res.json({
    phone: user.phone,
    fullName: user.fullName,
    role: user.role,
    cards: user.cards,
  });
};

module.exports = updateUser;
