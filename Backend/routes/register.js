const { express, bcrypt } = require("../utils/dependencies");
const { findUser } = require("../utils/authHelpers");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check that all required fields are provided
    if (!username || !email || !password || !name) {
      return res
        .status(400)
        .json({ result: false, message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ result: false, message: "Email is already registered" });
    }

    // Check if the username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ result: false, message: "Username is already taken" });
    }

    // Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });

    // Save the new user to the database and respond with success
    await newUser.save();
    return res.json(true);

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});
module.exports = router;
