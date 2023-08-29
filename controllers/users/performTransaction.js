const { HttpError } = require("../../helpers");
const Company = require("../../models/company");
const User = require("../../models/user");

const performTransaction = async (req, res, next) => {
  const { userId, companyId, cardId, amount, purpose } = req.body;

  const user = await User.findById(userId);
  const company = await Company.findById(companyId);

  if (!user || !company) {
    throw new HttpError(404, "User or company not found");
  }

  const card = user.cards.find((card) => card._id === cardId);

  if (!card) {
    throw new HttpError(400, "Card not found");
  }

  if (card.balance < amount) {
    throw new HttpError(400, "Insufficient balance");
  }

  card.balance -= amount;
  user.outcomingTransactions.push({
    amount,
    company: company.companyName,
    purpose,
  });

  company.balance += amount;
  company.incomingTransactions.push({
    amount,
    sender: user.fullName,
    purpose,
  });

  await user.save();
  await company.save();

  res.json({
    message: "Transaction successful",
  });
};

module.exports =  performTransaction ;
