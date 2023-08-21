const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
  const identifier = req.params.identifier;
  let companies = [];
  console.log("VALUE", identifier);
  console.log("REQUEST PARAMS", req.params);

  if (identifier) {
    companies = await Company.find({
      $or: [{ iban: identifier }, { companyName: identifier }],
    });
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  res.json(companies);
};

module.exports = getByIbanOrName;
