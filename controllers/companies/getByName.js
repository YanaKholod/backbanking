const Company = require("../../models/company");

const getByName = async (req, res, next) => {
  const { companyName } = req.params;
  const company = await Company.findOne({ companyName });

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  res.json(company);
};

module.exports = getByName;
