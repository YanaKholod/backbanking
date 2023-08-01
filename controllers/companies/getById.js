const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const getById = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can search the company" });
  }
  const { id } = req.params;

  const result = await Company.findById(id);

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
