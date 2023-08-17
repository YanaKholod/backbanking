const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIban = async (req, res) => {
  const { iban } = req.params;

  const company = await Company.findOne({ iban });

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  res.json(company);
};

module.exports = getByIban;
