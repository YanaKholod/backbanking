const { Schema, model } = require("mongoose");
const { ukrainePhoneRegex } = require("../constants/users");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: ukrainePhoneRegex,
      required: [true, "Phone is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post('save', )

const User = model("user", userSchema);

module.exports = User;
