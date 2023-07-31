const express = require("express");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/companyJoiSchema");
const { controlWrapper } = require("../../helpers");
const companyController = require("../../controllers/companies/index");

const router = express.Router();

router.get(
  "/:iban",
  authenticate,
  isValidId,
  controlWrapper(companyController.getByIban)
);

router.get(
  "/:name",
  authenticate,
  isValidId,
  controlWrapper(companyController.getByName)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addCompanySchema),
  controlWrapper(companyController.addCompany)
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addCompanySchema),
  controlWrapper(companyController.updateCompany)
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  controlWrapper(companyController.deleteCompanyById)
);

module.exports = router;
