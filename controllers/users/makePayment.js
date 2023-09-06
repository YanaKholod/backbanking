const { HttpError } = require("../../helpers");
const User = require("../../models/user");

const makePayment = async (req, res, next) => {
  const { senderUserId, recipientCardNumber, amount, purpose, senderCardType } =
    req.body;
  const senderUser = await User.findById(senderUserId);

  if (!senderUser) {
    throw new HttpError(404, "Sender user not found");
  }

  const recipientUser = await User.findOne({
    "cards.cardNumber": recipientCardNumber,
  });

  
  const recipientCardType = recipientUser
    ? recipientUser.cards.find(
        (card) => card.cardNumber === recipientCardNumber
      ).cardType
    : null;
  

  const senderCard = senderUser.cards.find(
    (card) => card.cardType === senderCardType
  );

  if (!senderCard) {
    throw new HttpError(
      400,
      "Sender card not found with the specified cardType"
    );
  }

  if (senderCard.balance < amount) {
    throw new HttpError(400, "Insufficient balance");
  }

  senderCard.balance -= amount;

  const outgoingTransaction = {
    date: new Date(),
    amount,
    recipient: recipientUser
      ? {
          cardNumber: recipientCardNumber,
          id: recipientUser._id,
          fullName: recipientUser.fullName,
        }
      : {
          cardNumber: recipientCardNumber,
        },
    purpose,
    cardType: senderCardType,
  };

  senderUser.outgoingCardTransactions.push(outgoingTransaction);

  if (recipientUser) {
    const recipientCard = recipientUser.cards.find(
      (card) => card.cardNumber === recipientCardNumber
    );

    if (!recipientCard) {
      throw new HttpError(
        400,
        "Recipient card not found with the specified cardNumber"
      );
    }

    recipientCard.balance += amount;
    const incomingTransaction = {
      date: new Date(),
      amount,
      sender: {
        fullName: senderUser.fullName,
        id: senderUserId,
      },
      purpose,
      cardType: recipientCardType,
    };

    if (recipientUser) {
  recipientUser.incomingCardTransactions.push(incomingTransaction);
};
  }

  await senderUser.save();
  if (recipientUser) {  await recipientUser.save();};
  

  res.json({
    message: "Payment successful",
  });
};

module.exports = makePayment;
