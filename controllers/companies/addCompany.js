const Company = require("../../models/company");

const addCompany = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can create the company" });
  }

  const { _id: owner } = req.user;

  
  const companyData = {
    ...req.body,
    owner, 
  };

  try {
    const result = await Company.create(companyData);
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = addCompany;
