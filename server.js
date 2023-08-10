const app = require("./index");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;
const PORT = 8080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
