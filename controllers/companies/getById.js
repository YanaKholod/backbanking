const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Company.findById(id);
  console.log("RESULT", result);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
