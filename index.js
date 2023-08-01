const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/api/auth-routing");
const companyRoute = require("./routes/api/company-routing");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/companies", companyRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, stack: err.stack });
});

module.exports = app;
