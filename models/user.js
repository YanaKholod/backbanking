const { Schema, model } = require("mongoose");
const { ukrainePhoneRegex } = require("../constants/users");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => ukrainePhoneRegex.test(value),
        message: "Invalid phone number format",
      },
      required: [true, "Phone is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    token: { type: String, default: "" },
    role: { type: String, default: "user" },
    // cards: [
    //   {
    //     cardType: { String, default: "" },
    //     cardNumber: { String, default: "" },
    //     balance: { Number, default: 0 },
    //   },
    // ],
    // outcomingTransactions: [
    //   {
    //     date: { type: Date, default: Date.now },
    //     amount: { Number, default: 0 },
    //     company: { String, default: "" },
    //     purpose: { String, default: "" },
    //   },
    // ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
