const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../schemas/userJoiSchemas");
const { controlWrapper } = require("../../helpers");
const authController = require("../../controllers/users/index");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controlWrapper(authController.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controlWrapper(authController.login)
);

router.post("/login");

module.exports = router;
