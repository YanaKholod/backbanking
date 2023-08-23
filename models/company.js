const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    iban: { type: String, required: true, unique: true, minlength: 24 },
    countryCode: {
      type: String,
      required: true,

      default: "UA",
    },
    edpnou: { type: String, required: true, minlength: 6 },
    balance: { type: String },
    incomingTransactions: [
      {
        date: { type: Date },
        amount: Number,
        sender: String,
        purpose: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

companySchema.post("save", handleMongooseError);

const Company = model("companies", companySchema);

module.exports = Company;
