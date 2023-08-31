const { HttpError } = require("../../helpers");
const User = require("../../models/user");

const getUserById = async (req, res) => {
  const { id } = req.params;

  const result = await User.findById(id);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getUserById;
