const Company = require("../../models/company");

const getAllCompanies = async (req, res) => {
  const { role } = req.user;
  const { sort } = req.body;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ error: "Only admin can retrieve all companies" });
  }

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const totalCompanies = await Company.countDocuments({});
  const totalPages = Math.ceil(totalCompanies / perPage);

  const { sortBy, sortOrder } = sort || {};
  let query = Company.find({})
    .skip((page - 1) * perPage)
    .limit(perPage);

  if (sortBy === "companyName") {
      const sortDirection = sortOrder === "asc" ? 1 : -1;
      query = query.sort({ companyName: sortDirection });
    }

  const companies = await query.exec();


  res.json({
    companies,
    totalPages,
    currentPage: page,
  });
};

module.exports = getAllCompanies;
