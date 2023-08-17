const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const deleteCompanyById = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can delete the company" });
  }
  const { _id } = req.params;
  const result = await Company.findByIdAndRemove(_id);

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  res.json("Delete success");
};

module.exports = deleteCompanyById;
