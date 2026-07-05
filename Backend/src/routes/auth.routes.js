const express = require("express");

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/authenticate.middleware");
const { authLimiter } = require("../middlewares/rateLimiter.middleware");
const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  resendVerificationEmailValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  authLimiter,
  loginValidator,
  validate,
  authController.login
);

router.post("/refresh-token",
  authController.refreshToken
);

router.post("/logout",
  authenticate,
  authController.logout
);

router.get("/me",
  authenticate,
  authController.getCurrentUser
);

router.patch(
  "/change-password",
  authenticate,
  changePasswordValidator,
  validate,
  authController.changePassword
);

router.post(
  "/forgot-password",
  authLimiter,
  forgotPasswordValidator,
  validate,
  authController.forgotPassword
);

router.patch(
  "/reset-password/:token",
  resetPasswordValidator,
  validate,
  authController.resetPassword
);

router.get(
  "/verify-email/:token",
  authController.verifyEmail
);

router.post(
  "/resend-verification-email",
  authLimiter,
  resendVerificationEmailValidator,
  validate,
  authController.resendVerificationEmail
);

module.exports = router;