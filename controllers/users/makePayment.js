const { HttpError } = require("../../helpers");
const User = require("../../models/user");
// const mongoose = require("mongoose");

const makePayment = async (req, res, next) => {
  const { senderUserId, recipientCardNumber, amount, purpose, senderCardType } =
    req.body;

  const senderUser = await User.findById(senderUserId);
  const senderFullName = senderUser.fullName;

  if (!senderUser) {
    throw new HttpError(404, "Sender user not found");
  }

  const recipientUser = await User.findOne({
    "cards.cardNumber": recipientCardNumber,
  });

  if (!recipientUser) {
    throw new HttpError(404, "Recipient user not found");
  }

  if (senderUser.cards.some((card) => card.balance < amount)) {
    throw new HttpError(400, "Insufficient balance");
  }

  senderUser.cards.forEach((card, amount) => {
    if (card.balance >= amount) {
      card.balance -= amount;
      return;
    }
    amount -= card.balance;
    card.balance = 0;
  });

  const outgoingTransaction = {
    date: new Date(),
    amount,
    recipient: {
      cardNumber: recipientCardNumber,
      userId: recipientUser._id,
    },
    purpose,
    senderCardType,
  };

  senderUser.outgoingTransactions.push(outgoingTransaction);

  // Increase the recipient's balance
  recipientUser.cards.find(
    (card) => card.cardNumber === recipientCardNumber
  ).balance += amount;

  // Create an incoming transaction for the recipient
  const incomingTransaction = {
    date: new Date(),
    amount,
    sender: {
      userId: senderUserId,
      useFullName: senderFullName,
    },
    purpose,
    senderCardType,
  };

  recipientUser.incomingCardTransactions.push(incomingTransaction);

  // Save the updated sender and recipient documents
  await senderUser.save();
  await recipientUser.save();

  res.json({
    message: "Payment successful",
  });
};

module.exports = makePayment;
