const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const User = require("../models/userSchema");

// Middleware Multer con acceso a username desde req.params
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/userImage/");
  },
  filename: (req, file, cb) => {
    const username = req.params.username;
    const ext = path.extname(file.originalname);
    cb(null, username + ext);
  },
});

const userBackground = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/background/");
  },
  filename: (req, file, cb) => {
    const username = req.params.username;
    const ext = path.extname(file.originalname);
    cb(null, username + ext);
  },
});

const uploadUserImage = multer({ storage: userStorage });
const uploadUserBackground = multer({ storage: userBackground });

// Route to upload user image
// This endpoint allows users to upload their profile image
// The request should include the username in the URL and the image file in the form-data
// The image will be saved in the "upload/userImage/" directory with the filename as the username
router.post(
  "/:username/image",
  uploadUserImage.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const baseUrl = req.protocol + "://" + req.get("host");
    const imagePath = `${baseUrl}/userImage/${req.file.filename}`;

    // Save the image path to the user's document in the database
    try {
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { image: imagePath },
        { new: true, upsert: true }
      );

      res.json({
        message: "Image uploaded successfully",
      });
    } catch (err) {
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
);

router.post(
  "/:username/background",
  uploadUserBackground.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const baseUrl = req.protocol + "://" + req.get("host");
    const backgroundPath = `${baseUrl}/background/${req.file.filename}`;

    // Save the background path to the user's document in the database
    try {
      const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { imageBackground: backgroundPath },
        { new: true, upsert: true }
      );

      res.json({
        message: "Image uploaded successfully",
      });
    } catch (err) {
      res.status(500).json({ result: false, message: "Internal server error" });
    }
  }
);

module.exports = router;
