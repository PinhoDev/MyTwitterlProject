require("dotenv").config();
const { express, cors, mongoose } = require("./utils/dependencies");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Serve static files from the "upload" directory
app.use("/userImage", express.static("upload/userImage"));
app.use("/background", express.static("upload/background"));

// MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("🟢 Connected to MongoDB Atlas"))
//   .catch((err) => console.error("🔴 Error connecting to MongoDB:", err));

// Route handling
app.use("/", require("./routes/loginAuth"));
app.use("/", require("./routes/registerAuth"));
app.use("/", require("./routes/userEndpoint"));
app.use("/", require("./routes/tweetsEndpoint"));
app.use("/", require("./routes/searchEndpoint"));
app.use("/", require("./routes/uploadEndpoint"));

// Start the server
if (process.env.NODE_ENV !== "test") {
  // MongoDB Connection
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("🟢 Connected to MongoDB Atlas");
      app.listen(PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("🔴 Error connecting to MongoDB:", err);
      process.exit(1);
    });
}

module.exports = app;
