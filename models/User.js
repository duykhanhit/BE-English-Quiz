const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email must be required",
      ],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender must be required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      minlength: 6,
      select: false,
    },
    resetPasswordCode: {
      type: Number,
      required: false,
      length: 6,
    },
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordCode = function () {
  const resetCode = Math.floor(Math.random() * 1000000);

  this.resetPasswordCode = resetCode;

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetCode;
};

module.exports = mongoose.model("user", UserSchema);
