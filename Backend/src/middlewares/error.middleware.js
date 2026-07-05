const ApiError = require("../utils/ApiError");
const logger = require("../helpers/logger");
const env = require("../config/env");

const errorMiddleware = (err, req, res, next) =>
{
  let error = err;

  if (!(error instanceof ApiError))
  {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
      error.errors || []
    );
  }

  logger.error("Request failed", {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode: error.statusCode,
    message: error.message,
  });

  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
    errors: error.errors || [],
    requestId: req.requestId,
    stack: env.nodeEnv === "development" ? error.stack : undefined,
  });
};

module.exports = errorMiddleware;