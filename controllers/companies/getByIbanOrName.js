const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
  const targetValue = req.params.targetValue;
  let companies = [];
  console.log("VALUE", targetValue);
  console.log("REQUEST PARAMS", req.params);

  if (targetValue) {
    companies = await Company.find({
      $or: [{ iban: targetValue }, { companyName: targetValue }],
    });
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  res.json(companies);
};

module.exports = getByIbanOrName;
