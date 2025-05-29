const { express, router } = require("../utils/dependencies");
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");
const { findUserId } = require("../utils/authHelpers");

// Route to create a New Tweet by a User
// Endpoint to create a new tweet and it use in the Home Page
// The request parameter should contain the username of the user
// The request body should contain the content and hashtags of the tweet
router.post("/:username/tweet", async (req, res) => {
  try {
    const { content, hashtags } = req.body;
    const { username } = req.params;
    const userId = await findUserId(username);

    // Fredrica gjort - Behövs ha med för att kunna göra tweets oavsett inloggad användare
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Create the New Tweet
    const newTweet = new Tweet({
      content,
      author: userId,
      hashtags,
      comments: [],
      createdAt: new Date(),
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
// Endpoint to create a comment on a tweet and it use in the Home Page
// The request parameter should contain the username of the user
// The request body should contain the tweetId and content of the comment
router.post("/:username/tweet/comment", async (req, res) => {
  try {
    const { tweetId, content } = req.body;
    const { username } = req.params;

    // Behövs ha med för att kunna göra tweets oavsett inloggad användare
    const user = await User.findOne({ username });
    if (!user) {
      console.error("Användare ej hittad:", username);
      return res.status(404).json({ result: false, message: "User not found" });
    }
    const userId = user._id;

    // Hämtar tweeten med tweetId
    const tweet = await Tweet.findById(tweetId); // Nödvändigt!
    if (!tweet) {
      return res
        .status(404)
        .json({ result: false, message: "Tweet not found" });
    }

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

// Route to get tweets of a user and their following users
// Endpoint to display on the Home Page
// The request parameter should contain the username of the user
router.get("/home/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "_id username image following"
    );

    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    const usersToQuery = [user._id, ...user.following];

    const tweets = await Tweet.find({ author: { $in: usersToQuery } })
      .select("content createdAt author hashtags comments")
      .populate("author", "username image") // 🔍 Detta gör att `author.username` och `author.image` kommer med
      .populate({
        path: "comments",
        populate: {
          path: "userName",
          select: "username image",
        },
      })
      .sort({ createdAt: -1 });

    return res.json({
      result: true,
      username: user.username,
      image: user.image,
      homeTweets: tweets,
    });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

// Route to get all tweets
// Endpoint to get all tweets and it use in the Home Page
// This endpoint is used to display all tweets on the Home Page
router.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({})
      .populate("author", "username")
      .populate("comments.userName", "username");

    return res.json({ result: true, tweets });
  } catch (error) {
    console.error("Fel vid hämtning av alla tweets:", error);
    return res.status(500).json({ result: false, message: "Serverfel" });
  }
});

module.exports = router;
