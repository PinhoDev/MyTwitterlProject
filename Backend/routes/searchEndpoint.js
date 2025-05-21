const express = require("express");
const router = express.Router();
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");

// Route to search for username or hashtags
// Endpoint to search for users and tweets by hashtags and use in the Home Page
// The request parameter should contain the search text
// The request body should contain the search text
router.get("/search/:searchText", async (req, res) => {
  try {
    const { searchText } = req.params;

    // Search for users by username
    const users = await User.find({
      username: { $regex: searchText, $options: "i" },
    }).select("username  name email profilePicture");

    // Search for tweets by hashtags
    const tweets = await Tweet.find({
      hashtags: { $regex: searchText, $options: "i" },
    }).select("content hashtags createdAt author");

    // Respond with the search results of users and tweets
    return res.json({ result: true, users, tweets });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error searching:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
