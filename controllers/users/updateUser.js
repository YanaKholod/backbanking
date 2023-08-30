const User = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { id, card } = req.body;

  const user = await User.findOne({ _id:id });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

 if (card) {
    const existingCard = user.cards.find((existingCard) => existingCard.cardType === card.cardType);

    if (existingCard) {
      existingCard.cardNumber = card.cardNumber;
      existingCard.balance = card.balance;
    } else {
      user.cards.push(card);
    }
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
