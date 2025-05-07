const User = require("../models/userSchema");
const Tweet = require("../models/tweetSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  // Helper to find user by email or username
  async function findUser(emailOrUsername) {
    return await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  // Endpoint to Login
  app.post("/login", async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;

      // Find user
      const user = await findUser(emailOrUsername);
      if (!user) {
        return res
          .status(404)
          .json({ result: false, message: "User not found" });
      }

      // Validate password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ result: false, message: "Incorrect password" });
      }

      // Generate JWT token
      const payload = {
        userId: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: "2h" });

      // Respond with token
      return res.json({
        result: true,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ result: false, message: "Internal server error" });
    }
  });
};
