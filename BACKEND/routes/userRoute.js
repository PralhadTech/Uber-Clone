const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least 3 characters."),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Lastname must be at least 3 characters."),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  userController.registerUser
);

module.exports = router;
