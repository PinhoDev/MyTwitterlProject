const { express, router } = require("../utils/dependencies");
const User = require("../models/userSchema");
const Tweet = require("../models/tweetSchema");

// Route to get tweets of a user and their following users
// Endpoint to to Display in the Home Page
// This endpoint return username, username.image and also the tweets of the user
// and the tweets of the users that the user is following. The tweets should be
// sorted by createdAt in descending order.
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
    console.log("Users to query:", usersToQuery);

    const tweets = await Tweet.find({ author: { $in: usersToQuery } })
      .select("content createdAt")
      .populate("author", "username image")
      .populate({
        path: "comments",
        populate: {
          path: "userName",
          select: "username image",
        },
      })
      .sort({ createdAt: -1 });

    // Respond with success and the username, image, and tweets of the user and their following users
    return res.json({
      result: true,
      username: user.username,
      image: user.image,
      homeTweets: tweets,
    });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

// Route to get user details by username
// Endpoint to Display the user details in Profile page
// The request parameter should contain the username of the user
router.get("/profile/:username", async (req, res) => {
  try {
    const userDetails = await User.findOne({ username: req.params.username })
      .populate("followers", "username image")
      .populate("following", "username image")
      .populate({
        path: "tweets",
        select: "content createdAt",
        populate: {
          path: "comments",
          populate: {
            path: "userName",
            select: "username",
          },
        },
      });

    if (!userDetails) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    // Respond with success and user details
    return res.json({ result: true, userDetails });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

// Route to Add or Delete a following to a user
// Endpoint to add or delete a following to a user and it use in the Home Page
// The request parameter should contain the username of the user
// The request body should contain the following user
router.post("/:username/following", async (req, res) => {
  try {
    const { username } = req.params;
    const { following } = req.body;

    // Find the user and the following user
    const user = await User.findOne({ username });
    const followingUser = await User.findOne({ username: following });

    // Check if the user is already following the following user
    const isFollowing = user.following.includes(followingUser._id);
    if (isFollowing) {
      // If already following, remove the following user from the user's following list
      user.following = user.following.filter(
        (id) => id.toString() !== followingUser._id.toString()
      );
      followingUser.followers = followingUser.followers.filter(
        (id) => id.toString() !== user._id.toString()
      );
    } else {
      // If not following, add the following user to the user's following list
      user.following.push(followingUser._id);
      followingUser.followers.push(user._id);
    }
    // Save the changes to both users
    await user.save();
    await followingUser.save();

    // Respond with success and the updated following status
    return res.json({
      result: true,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });

    // Respond with error if something goes wrong
  } catch (error) {
    console.error("Error updating following:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
