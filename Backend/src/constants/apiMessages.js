const API_MESSAGES = {
  /*
  ========================================
  GENERAL
  ========================================
  */

  SUCCESS: "Operation completed successfully.",
  CREATED: "Resource created successfully.",
  UPDATED: "Resource updated successfully.",
  DELETED: "Resource deleted successfully.",

  INTERNAL_SERVER_ERROR: "Internal server error.",
  ROUTE_NOT_FOUND: "Route not found.",

  /*
  ========================================
  AUTH
  ========================================
  */

  REGISTER_SUCCESS: "User registered successfully.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",

  TOKEN_REFRESH_SUCCESS: "Access token refreshed successfully.",

  CURRENT_USER_SUCCESS: "Current user fetched successfully.",

  PASSWORD_CHANGED_SUCCESS: "Password changed successfully.",

  PASSWORD_RESET_SUCCESS: "Password reset successfully.",

  PASSWORD_RESET_LINK_SENT:
    "If the email exists, reset instructions will be sent.",

  OLD_PASSWORD_INCORRECT:
    "Old password is incorrect.", 

  EMAIL_VERIFIED_SUCCESS:
    "Email verified successfully.",

  EMAIL_VERIFICATION_SENT:
    "If the email exists, verification instructions will be sent.",

  /*
  ========================================
  AUTH ERRORS
  ========================================
  */

  INVALID_CREDENTIALS:
    "Invalid email or password.",

  UNAUTHORIZED:
    "Unauthorized access.",

  FORBIDDEN:
    "You are not authorized to perform this action.",

  EMAIL_ALREADY_EXISTS:
    "User already exists with this email.",

  USER_NOT_FOUND:
    "User not found.",

  INVALID_RESET_TOKEN:
    "Invalid or expired password reset token.",

  INVALID_EMAIL_VERIFICATION_TOKEN:
    "Invalid or expired email verification token.",

  EMAIL_ALREADY_VERIFIED:
    "Email is already verified.",

  ACCOUNT_BLOCKED:
    "Your account has been blocked.",

  REFRESH_TOKEN_REQUIRED:
    "Refresh token is required.",

  INVALID_REFRESH_TOKEN:
    "Invalid refresh token.",
};

module.exports = API_MESSAGES;