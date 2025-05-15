const { express } = require("../utils/dependencies");
const router = express.Router();
const User = require("../models/userSchema");

// Route to get user details by username
router.get("/:username", async (req, res) => {
  try {
    const userDetails = await User.findOne({ username: req.params.username })
      .populate("followers", "username")
      .populate("following", "username")
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
    console.log("User Details:", userDetails);

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

// Route to Add or Delete a following to a user
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
    return res.json({
      result: true,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });
  } catch (error) {
    console.error("Error updating following:", error);
    return res
      .status(500)
      .json({ result: false, message: "Internal server error" });
  }
});

module.exports = router;
