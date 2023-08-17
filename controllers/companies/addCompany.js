const Company = require("../../models/company");

const addCompany = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can create the company" });
  }

  const { _id: owner } = req.user;

  // const result = await Company.create(...req.body, owner);
  // // User.update();
  // res.status(201).json(result);
  const companyData = {
    ...req.body,
    owner, // Add the owner property to the company data
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
