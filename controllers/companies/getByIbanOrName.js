const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
 const { iban, name } = req.params;
  let company;

  if (iban) {
    company = await Company.findOne({ iban });
  } else if (name) {
    company = await Company.findOne({ companyName: name });
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  res.json(company);
};

module.exports = getByIban;
