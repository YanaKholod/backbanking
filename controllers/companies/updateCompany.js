const { HttpError } = require("../../helpers");
const Company = require("../../models/company");

const updateCompany = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can update the company" });
  }

  const { id } = req.params;
  const updateInfo = req.body;

  const result = await Company.findByIdAndUpdate(id, updateInfo, {
    new: true,
  });

  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json("Update success");
};

module.exports = updateCompany;
