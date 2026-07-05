const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
};

module.exports = env;



// const dotenv = require("dotenv");

// dotenv.config();

// const env = {
//   nodeEnv: process.env.NODE_ENV || "development",
//   port: process.env.PORT || 5000,
//   mongoUri:
//     process.env.MONGO_URI ||
//     "mongodb://127.0.0.1:27017/ecommerce_multivendor",
//   clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

//   jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "local_access_secret",
//   jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "local_refresh_secret",
//   accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
//   refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
// };

// module.exports = env;