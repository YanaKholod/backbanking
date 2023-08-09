const app = require("./index");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 8080 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
   app.listen(PORT);
    console.log("Success server");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
