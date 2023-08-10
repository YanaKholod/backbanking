const app = require("./index");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 8080 } = process.env;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(DB_HOST, mongooseOptions)
  .then(() => {
    app.listen(PORT);
    console.log("Success server");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
