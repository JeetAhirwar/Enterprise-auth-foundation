const ERROR_CODES = require("../constants/errorCodes");

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    code = ERROR_CODES.INTERNAL_SERVER_ERROR
  ) {
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;