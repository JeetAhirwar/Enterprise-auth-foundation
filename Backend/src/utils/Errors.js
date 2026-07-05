const ApiError = require("./ApiError");
const HTTP_STATUS = require("../constants/httpStatus");
const API_MESSAGES = require("../constants/apiMessages");
const ERROR_CODES = require("../constants/errorCodes");

const Errors = {
  validation(errors = []) {
    return new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      errors,
      ERROR_CODES.VALIDATION_ERROR
    );
  },

  unauthorized() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      API_MESSAGES.UNAUTHORIZED,
      [],
      ERROR_CODES.AUTH_UNAUTHORIZED
    );
  },

  forbidden() {
    return new ApiError(
      HTTP_STATUS.FORBIDDEN,
      API_MESSAGES.FORBIDDEN,
      [],
      ERROR_CODES.AUTH_FORBIDDEN
    );
  },

  invalidCredentials() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      API_MESSAGES.INVALID_CREDENTIALS,
      [],
      ERROR_CODES.AUTH_INVALID_CREDENTIALS
    );
  },

  emailAlreadyExists() {
    return new ApiError(
      HTTP_STATUS.CONFLICT,
      API_MESSAGES.EMAIL_ALREADY_EXISTS,
      [],
      ERROR_CODES.USER_ALREADY_EXISTS
    );
  },

  userNotFound() {
    return new ApiError(
      HTTP_STATUS.NOT_FOUND,
      API_MESSAGES.USER_NOT_FOUND,
      [],
      ERROR_CODES.USER_NOT_FOUND
    );
  },

  accountBlocked() {
    return new ApiError(
      HTTP_STATUS.FORBIDDEN,
      API_MESSAGES.ACCOUNT_BLOCKED,
      [],
      ERROR_CODES.USER_BLOCKED
    );
  },

  invalidRefreshToken() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      API_MESSAGES.INVALID_REFRESH_TOKEN,
      [],
      ERROR_CODES.AUTH_TOKEN_INVALID
    );
  },

  refreshTokenRequired() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      API_MESSAGES.REFRESH_TOKEN_REQUIRED,
      [],
      ERROR_CODES.AUTH_UNAUTHORIZED
    );
  },

  oldPasswordIncorrect() {
    return new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      API_MESSAGES.OLD_PASSWORD_INCORRECT,
      [],
      ERROR_CODES.AUTH_INVALID_CREDENTIALS
    );
  },

  invalidResetToken() {
    return new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      API_MESSAGES.INVALID_RESET_TOKEN,
      [],
      ERROR_CODES.AUTH_TOKEN_INVALID
    );
  },

  invalidEmailVerificationToken() {
    return new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      API_MESSAGES.INVALID_EMAIL_VERIFICATION_TOKEN,
      [],
      ERROR_CODES.AUTH_TOKEN_INVALID
    );
  },

  emailAlreadyVerified() {
    return new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      API_MESSAGES.EMAIL_ALREADY_VERIFIED,
      [],
      ERROR_CODES.VALIDATION_ERROR
    );
  },
};

module.exports = Errors;