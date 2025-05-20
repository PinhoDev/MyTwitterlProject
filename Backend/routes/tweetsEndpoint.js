const { express } = require("../utils/dependencies");
const router = express.Router();
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");
const { findUserId } = require("../utils/authHelpers");

// Route to create a New Tweet by a User
// Endpoint to create a new tweet
// The request parameter should contain the username of the user
// The request body should contain the content and hashtags of the tweet
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
// Endpoint to create a comment on a tweet
// The request parameter should contain the username of the user
// The request body should contain the tweetId and content of the comment
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
