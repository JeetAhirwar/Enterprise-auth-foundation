const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.accessTokenExpiresIn,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.refreshTokenExpiresIn,
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtAccessSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};