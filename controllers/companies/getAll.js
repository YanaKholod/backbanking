const Company = require("../../models/company");

const getAllCompanies = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ error: "Only admin can retrieve all companies" });
  }

try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const totalCompanies = await Company.countDocuments({});
    const totalPages = Math.ceil(totalCompanies / perPage);

   const sortField = req.query.sortField || "companyName"; // Default sort by companyName
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // Filtering
    const filter = {}; // You can add filtering conditions here based on your requirements
    if (req.query.countryCode) {
      filter.countryCode = req.query.countryCode;
    };
  if (req.query.companyName) {
      filter.companyName = req.query.companyName;
    }; 
  if (req.query.balance) {
      filter.balance = req.query.balance;
    };
    // Add more filter conditions as needed

    const totalCompanies = await Company.countDocuments(filter);
    const totalPages = Math.ceil(totalCompanies / perPage);

    const companies = await Company.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * perPage)
      .limit(perPage);
    

    res.json({
      companies,
      totalPages,
      currentPage: page,
    });
  
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllCompanies;
