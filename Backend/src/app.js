const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/cors");
const apiRoutes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const requestIdMiddleware = require("./middlewares/requestId.middleware");
const requestLoggerMiddleware = require("./middlewares/requestLogger.middleware");
const { apiLimiter } = require("./middlewares/rateLimiter.middleware");

const hpp = require("hpp");
const compression = require("compression");
const env = require("./config/env");

const app = express();

// 1. CORS
app.use(cors(corsOptions));
// 2. Request ID
app.use(requestIdMiddleware);
// 3. Request Logger
app.use(requestLoggerMiddleware);
// 4. Security Headers
app.use(helmet());

// 5. Morgan (Development only)
// app.use(morgan("dev"));
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// 6. Security Middlewares
app.use(hpp());
app.use(compression());


// 7. Rate Limiter (YAHAN ADD KARNA HAI)
app.use("/api", apiLimiter);

// 8. Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ecommerce Multi Vendor API is running",
  });
});

app.use("/api/v1", apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;