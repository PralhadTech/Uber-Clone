const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 characters."],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Lastname must be at least 3 characters."],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters."],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Password must be at least 6 characters."],
  },
  socketId: {
    type: String,
    default: null,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
