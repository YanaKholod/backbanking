const Company = require("../../models/company");

const getAllCompanies = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can retrieve all companies" });
  }

  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllCompanies;