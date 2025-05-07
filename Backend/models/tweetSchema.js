const mongoose = require("mongoose");
const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Tweet", tweetSchema);
