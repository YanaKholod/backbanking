const Joi = require("joi");

const addCompanySchema = Joi.object({
  companyName: Joi.string().required(),
  iban: Joi.string().min(24).required(),
  edpnou: Joi.string().min(6).required(),
  countryCode: Joi.string(),
});

const schemas = { addCompanySchema };

module.exports = { schemas };
