const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getByIbanOrName = async (req, res) => {
  const identifier = req.params.identifier;
  let companies = [];

  if (identifier) {
    companies = await Company.find({
      $or: [
        { iban: { $regex: identifier, $options: "i" } },
        { companyName: { $regex: identifier, $options: "i" } },
      ],
    });
    console.log(companies);
  } else {
    throw new HttpError(400, "Invalid parameters");
  }

  res.json(companies);
};

module.exports = getByIbanOrName;
