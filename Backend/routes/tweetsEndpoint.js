const { express } = require("../utils/dependencies");
const router = express.Router();
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");

// Route to get all tweets by a specific user
router.get("/:username/tweets", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    console.log(user._id);
    const userTweets = await Tweet.find({ author: user._id });
    console.log(userTweets);

    // Check if for any tweets were found for the user
    if (!userTweets) {
      return res
        .status(404)
        .json({ result: false, message: "No tweets found" });
    }

    // Respond successfully with the tweets
    return res.json({ result: true, userTweets });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error fetching user tweets:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
