const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
  const { targetValue } = req.params;
  let company;
  console.log("reqParams", req.params);
  if (targetValue) {
    company = await Company.findOne({ iban: targetValue });

    if (!company) {
      company = await Company.findOne({ companyName: targetValue });
    }
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  if (!company) {
    throw new HttpError(404, "Company not found");
  }

  res.json(company);
};

module.exports = getByIbanOrName;
