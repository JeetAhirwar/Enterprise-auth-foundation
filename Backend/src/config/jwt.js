const env = require("./env");

const jwtConfig = {
  accessSecret: env.jwtAccessSecret,
  refreshSecret: env.jwtRefreshSecret,

  accessExpiresIn: env.accessTokenExpiresIn,
  refreshExpiresIn: env.refreshTokenExpiresIn,
};

module.exports = jwtConfig;