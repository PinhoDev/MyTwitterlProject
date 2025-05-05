// Server: Express.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const endpoints = require("./routes/endpoints"); // Import your endpoints
const app = express();
const PORT = 3000;

// Enable CORS for all origins (temporary for debugging)
app.use(cors());

/* Connection to MongoDB Atlas */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Connected to MongoDB Atlas"))
  .catch((err) => console.error("🔴 Error connecting to MongoDB:", err));
  Test

app.use(express.json());
app.use(express.static("public"));

// Use endpoints
endpoints(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
