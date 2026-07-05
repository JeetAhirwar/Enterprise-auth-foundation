const { validationResult } = require("express-validator");
const Errors = require("../utils/Errors");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  return next(Errors.validation(extractedErrors));
};

module.exports = validate;