const { HttpError } = require("../../helpers");
const User = require("../../models/user");
const mongoose = require("mongoose"); 

const addDeposit = async (req, res) => {
  const { id } = req.params;
  const { userId, sumOfDeposit, fromCard, depositType, interestRate } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new HttpError(404, "User not found");
  }
  
const card = user.cards.find((card) => card._id.equals(new mongoose.Types.ObjectId(fromCard.id)));
 
  if (!card) {
    throw new HttpError(400, "Card not found");
  }

  if (card.balance < sumOfDeposit) {
    throw new HttpError(400, "Insufficient balance");
  }
  
  card.balance -= sumOfDeposit;
  const deposit = {
    sumOfDeposit,
    fromCard: { cardType: fromCard.cardType, id: fromCard.id, },
    depositType,
    interestRate,
  };

  user.deposits.push(deposit);

  await user.save();

  res.json({
    message: "Deposit added successfully",
  });
};

module.exports = addDeposit;
