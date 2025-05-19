const { express } = require("../utils/dependencies");
const router = express.Router();
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");
const { findUserId } = require("../utils/authHelpers");

//Router to get users tweets
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("tweet")
      .populate({
        path: "tweets",
        options: { sort: { createdAt: -1 } },
        populate: { path: "author", select: "username name" },
      });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, tweets: user.tweets });
  } catch (err) {
    console.error("Error fetching user tweets:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Router to get tweets written by friends(the ones the user follows) tweets
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("following");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    //Get id of the ones user follows
    const followingIds = user.following.map((friend) => friend._id);
    // Get tweets from the ones the user follows
    const tweets = await Tweet.find({ author: { $in: followingIds } })
      .sort({ createdAt: -1 }) //Sort by when they where created
      .populate("author", "username name");

    res.json({ success: true, tweets });
  } catch (err) {
    console.error("Error fetching friends' tweets:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to create a New Tweet by a User
router.post("/:username/create", async (req, res) => {
  try {
    const { content, hashtags } = req.body;
    const { username } = req.params;
    const userId = await findUserId(username);

    // Create the New Tweet
    const newTweet = new Tweet({
      content,
      author: userId,
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
    const userId = await findUserId(username);

    // Add the comment to the Tweet
    tweet.comments.push({
      content,
      userName: userId,
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
