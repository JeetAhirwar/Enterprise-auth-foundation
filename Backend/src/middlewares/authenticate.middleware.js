const asyncHandler = require("../utils/asyncHandler");
const { verifyAccessToken } = require("../utils/token");
const userRepository = require("../repositories/user.repository");
const Errors = require("../utils/Errors");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw Errors.unauthorized();
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  const user = await userRepository.findById(decoded.id);

  if (!user || user.isDeleted) {
    throw Errors.unauthorized();
  }

  if (user.isBlocked) {
    throw Errors.accountBlocked();
  }

  req.user = user;
  next();
});

module.exports = authenticate;