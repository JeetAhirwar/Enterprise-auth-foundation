const rateLimit = require("express-rate-limit");
const env = require("../config/env");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "production" ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests, please try again later",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "production" ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many authentication attempts, please try again later",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};