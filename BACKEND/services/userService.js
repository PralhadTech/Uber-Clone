const userModel = require("../models/userModel");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("Missing required fields");
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
