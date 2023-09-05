const getCurrent = async (req, res) => {
  const { phone, fullName, role, outcomingTransactions, cards, id } = req.user;

  res.json({
    id,
    phone,
    fullName,
    role,
    cards,
    outcomingTransactions,
    incomingCardTransactions,
    outgoingCardTransactions,
  });
};

module.exports = getCurrent;
