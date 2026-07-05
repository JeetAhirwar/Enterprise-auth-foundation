const logger = require("../helpers/logger");

const requestLoggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;

    logger.info("HTTP Request Completed", {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });
  });

  next();
};

module.exports = requestLoggerMiddleware;