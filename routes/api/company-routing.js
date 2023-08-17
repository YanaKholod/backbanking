const express = require("express");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/companyJoiSchema");
const { controlWrapper } = require("../../helpers");
const companyController = require("../../controllers/companies/index");

const router = express.Router();

router.get('/all', authenticate, companyController.getAll);
router.get(
  "/iban/:iban",
  authenticate,
  isValidId,
  controlWrapper(companyController.getByIban)
);
router.get(
  "/:id",
  authenticate,
  isValidId,
  controlWrapper(companyController.getById)
);

router.get(
  "name/:name",
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

router.patch(
  "change/:id",
  authenticate,
  isValidId,
  controlWrapper(companyController.updateCompany)
);

router.delete(
  "delete/:id",
  authenticate,
  isValidId,
  controlWrapper(companyController.deleteCompanyById)
);

module.exports = router;
