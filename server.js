const app = require("./index");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;
const PORT = 8080;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(DB_HOST, mongooseOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
