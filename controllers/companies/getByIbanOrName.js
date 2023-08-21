const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
  const { targetValue } = req.params;
  let companies = [];

  console.log("reqParams", req.params);
  // if (targetValue) {
  //   company = await Company.findOne({ iban: targetValue });

  //   if (!company) {
  //     company = await Company.findOne({ companyName: targetValue });
  //   }
  if (targetValue) {
    // Search for companies matching either IBAN or company name
    companies = await Company.find({
      $or: [{ iban: targetValue }, { companyName: targetValue }],
    });
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  // if (!company) {
  //   throw new HttpError(404, "Company not found");
  // }

  res.json(companies);
};

module.exports = getByIbanOrName;
