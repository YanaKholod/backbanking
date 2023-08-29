const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
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

router.post("/logout", authenticate, controlWrapper(authController.logout));

router.get("/current", authenticate, controlWrapper(authController.getCurrent));

router.patch(
  "/change",
  authenticate,
  controlWrapper(authController.updateUser)
);

router.patch(
  "/transaction",
  authenticate,
  controlWrapper(authController.performTransaction)
);

module.exports = router;
