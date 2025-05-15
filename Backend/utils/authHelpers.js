const User = require("../models/userSchema");

// Helper to find user by email or username
async function findUser(emailOrUsername) {
  return await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
}

// Helper to find userId by username
async function findUserId(username) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  return user._id;
}

module.exports = { findUser, findUserId };
