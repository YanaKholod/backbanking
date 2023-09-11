const getCurrent = async (req, res) => {
  const { phone, fullName, role, outcomingTransactions, cards, id, incomingCardTransactions, outgoingCardTransactions, deposits } = req.user;

  res.json({
    id,
    phone,
    fullName,
    role,
    cards,
    outcomingTransactions,
    incomingCardTransactions,
    outgoingCardTransactions,
    deposits,
  });
};

module.exports = getCurrent;
