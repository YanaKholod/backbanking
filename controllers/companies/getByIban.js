const Company = require("../../models/company");

const getByIban = async (req, res) => {
  const { iban } = req.params;
  const company = await Company.findOne({ iban });

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  res.json(company);
};

module.exports = getByIban;
