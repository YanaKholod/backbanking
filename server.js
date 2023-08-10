const app = require("./index");
const mongoose = require("mongoose");

// const { DB_HOST, PORT = 8080 } = process.env;
const DB_HOST =
  "mongodb+srv://kholodjana:1JUK9JPUWrztR9y3@yana.ihalwdp.mongodb.net/banking?retryWrites=true&w=majority";
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
