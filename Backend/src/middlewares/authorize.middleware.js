const Errors = require("../utils/Errors");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw Errors.forbidden();
    }

    next();
  };
};

module.exports = authorize;