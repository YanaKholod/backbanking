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
const sortBy = req.query.sortBy || "companyName"; 
    const sortOrder = req.query.sortOrder || "asc"; 

    const totalCompanies = await Company.countDocuments({});
    const totalPages = Math.ceil(totalCompanies / perPage);

    let query = Company.find({}).skip((page - 1) * perPage).limit(perPage);

    if (sortBy === "companyName") {
      
      query = query.sort({ companyName: sortOrder === "asc" ? 1 : -1 });
    }

    const companies = await query.exec();

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
