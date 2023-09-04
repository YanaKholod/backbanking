const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can retrieve all users" });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const totalUsers = await User.countDocuments({});
    const totalPages = Math.ceil(totalUsers / perPage);

    const users = await User.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      users,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllUsers;
