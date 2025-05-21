const { express, jwt, bcrypt } = require("../utils/dependencies");
const { findUser } = require("../utils/authHelpers");
const router = express.Router();

// Route to get User name
// Endpoint to get the user's name by email or username and it use in the Login Page
// The request body should contain the email or username
router.post("/getUserName", async (req, res) => {
  try {
    const { emailOrUsername } = req.body;

    // Validate input
    if (!emailOrUsername || typeof emailOrUsername !== "string") {
      return res
        .status(400)
        .json({ result: false, message: "Invalid email or username" });
    }

    // Find the user by email or username
    const user = await findUser(emailOrUsername);
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Respond with the user's name
    return res.json({ result: true, name: user.name });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error in /getUserName:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

// Route to login authenticate a user
// Endpoint to authenticate a user and it use in the LoginPassword Page
// The request body should contain the email or username and password
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Validate input
    if (!emailOrUsername || typeof emailOrUsername !== "string") {
      return res
        .status(400)
        .json({ result: false, message: "Invalid email or username" });
    }

    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ result: false, message: "Invalid password" });
    }

    // Check if the user exists
    const user = await findUser(emailOrUsername);
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ result: false, message: "Incorrect password" });
    }

    // Generate a JWT token
    const jwtSecret = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "2h",
    });

    // Respond with success and the token
    return res.json({ result: true, token });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
