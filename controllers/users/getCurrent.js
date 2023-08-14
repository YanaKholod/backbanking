const getCurrent = async (req, res) => {
  const { phone, fullName } = req.user;

  res.json({
    phone,
    fullName,
    role
  });
};

module.exports = getCurrent;
