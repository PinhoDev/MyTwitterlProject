require("dotenv").config();
const { express, cors, mongoose } = require("./utils/dependencies");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Connected to MongoDB Atlas"))
  .catch((err) => console.error("🔴 Error connecting to MongoDB:", err));

// Route handling
app.use("/login", loginRoute);
app.use("/register", registerRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
