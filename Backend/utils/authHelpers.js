const User = require("../models/userSchema");

// Helper to find user by email or username
async function findUser(emailOrUsername) {
  return await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
}

module.exports = { findUser };
