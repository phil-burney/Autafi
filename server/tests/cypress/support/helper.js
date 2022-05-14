const User = require('../../../models/user')

let user = {
  username: "GenericUser",
  email: "philburney@ymail.com",
  password: "Password123*"
}

exports.addNewUser = function () {
  const newUser = new User(
    user);
  // await newUser.save();
  return
}
