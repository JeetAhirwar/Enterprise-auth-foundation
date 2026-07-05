const express = require("express");
const ApiResponse = require("../utils/ApiResponse");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "API health check successful", {
      service: "Ecommerce Multi Vendor API",
      status: "OK",
    })
  );
});

router.use("/auth", authRoutes);

module.exports = router;