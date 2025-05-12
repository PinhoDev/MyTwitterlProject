const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  imageBackground: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  occupation: {
    type: String,
    default: "",
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
