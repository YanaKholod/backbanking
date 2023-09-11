const { HttpError } = require("../../helpers");
const User = require("../../models/user");

const addDeposit = async (req, res) => {
  const { id } = req.params;
  const { userId, sumOfDeposit, fromCard, depositType, interestRate } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

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
