const { express } = require("../utils/dependencies");
const router = express.Router();
const User = require("../models/userSchema");

// Route to get user details by username
router.get("/:username", async (req, res) => {
  try {
    const userDetails = await User.findOne({ username: req.params.username });
    if (!userDetails) {
      return res.status(404).json({ result: false, message: "User not found" });
    }
    return res.json({ result: true, userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
