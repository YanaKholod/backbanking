const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateUser = require("./updateUser");
const performTransaction = require("./performTransaction");
const getAllUsers = require("./getAll");
const getUserById = require("./getUserById");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateUser,
  performTransaction,
  getAllUsers,
  getUserById,
};
