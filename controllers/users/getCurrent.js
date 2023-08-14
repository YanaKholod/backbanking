const getCurrent = async (req, res) => {
  const { phone, fullName } = req.user;

  res.json({
     user: {
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

module.exports = getCurrent;
