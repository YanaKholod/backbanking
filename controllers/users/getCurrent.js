const getCurrent = async (req, res) => {
  const { phone, name } = req.user;

  res.json({
    phone,
    name,
  });
};

module.exports = getCurrent;
