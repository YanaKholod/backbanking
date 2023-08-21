const getByIban = require("./getByIbanOrName");
const getByName = require("./getByName");
const addCompany = require("./addCompany");
const deleteCompanyById = require("./deleteCompany");
const updateCompany = require("./updateCompany");
const getById = require("./getById");
const getAll = require("./getAll");

module.exports = {
  getByIbanOrName,
  addCompany,
  deleteCompanyById,
  updateCompany,
  getById,
  getAll,
};
