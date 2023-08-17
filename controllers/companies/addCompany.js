const Company = require("../../models/company");

const addCompany = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can create the company" });
  }

  const { _id: owner } = req.user;

  const result = await Company.create(...req.body, owner);
  // User.update();
  res.status(201).json(result);
};

module.exports = addCompany;
