const { express, jwt, bcrypt } = require("../utils/dependencies");
const { findUser } = require("../utils/authHelpers");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Check that all required fields are provided
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ result: false, message: "All fields are required" });
    }

    // Check if the user exists
    // Assuming findUser can handle both email and username
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
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "2h" });

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
