const { express, jwt, bcrypt } = require("../utils/dependencies");
const { findUser } = require("../utils/authHelpers");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await findUser(emailOrUsername);
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ result: false, message: "Incorrect password" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "2h" });

    return res.json({ result: true, token });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
