const { validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const userService = require("../services/userService");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create the user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = user.generateAuthToken();

    res
      .status(201)
      .json({ token, user: { email: user.email, fullname: user.fullname } });
  } catch (err) {
    next(err);
  }
};
