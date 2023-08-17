const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByName = async (req, res) => {
  const { companyName } = req.params;
  const company = await Company.findOne({ companyName });

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  res.json(company);
};

module.exports = getByName;
