const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admin can retrieve all users" });
  }

  try {
    const companies = await User.find({});
    res.json(companies);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllUsers;
