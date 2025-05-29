const { express, bcrypt, router } = require("../utils/dependencies");
const { findUser } = require("../utils/authHelpers");
const User = require("../models/userSchema");

// Route to register a New User
// Endpoint to register a new user and it use in the Register Page
// The request body should contain the username, email, password, and name
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      name,
      about,
      occupation,
      location,
      website,
      password,
      image,
    } = req.body;

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
      name,
      about,
      occupation,
      location,
      website,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Save the new user to the database and respond with success
    await newUser.save();

    // Respond with success if the user is created
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
