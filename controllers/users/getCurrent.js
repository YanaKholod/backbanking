const getCurrent = async (req, res) => {
  const { phone, fullName, role, outcomingTransactions, cards } = req.user;

  res.json({
    phone,
    fullName,
    role,
    cards,
    outcomingTransactions,
  });
};

module.exports = getCurrent;
