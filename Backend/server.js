const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5500;

// Middleware
app.use(express.json());

// Connection to MongoDB Atlas
// mongoose
//   .connect("YOUR_CONNECTION_STRING_HERE", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("🟢 Connected to MongoDB Atlas"))
//   .catch((err) => console.error("🔴 Error connecting to MongoDB:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Express server with MongoDB is running 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
