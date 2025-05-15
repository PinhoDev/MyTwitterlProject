const { express } = require("../utils/dependencies");
const router = express.Router();
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");

// Route to create a New Tweet by a User
router.post("/:username/create", async (req, res) => {
  console.log("Route hit");
  try {
    const { content, hashtags } = req.body;
    const { username } = req.params;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Create the New Tweet
    const newTweet = new Tweet({
      content,
      author: user._id,
      hashtags,
      createdAt: new Date(),
      comments: [],
    });
    await newTweet.save();

    // Add the Tweet to the User
    user.tweets.push(newTweet._id);
    await user.save();

    // Respond successfully if the tweet is created
    return res.json(true);

    // Respond unsuccessfully if the tweet is not created
  } catch (error) {
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

// Route to create a comment on a Tweet
router.post("/:username/tweet/comment", async (req, res) => {
  try {
    const { tweetId, content } = req.body;
    const { username } = req.params;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Add the comment to the Tweet
    tweet.comments.push({
      content,
      userName: user._id,
      createdAt: new Date(),
    });
    await tweet.save();

    // Respond successfully if the comment is created
    return res.json(true);

    // Respond unsuccessfully if the comment is not created
  } catch (error) {
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
