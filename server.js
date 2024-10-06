const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const Database = require("./config/Db");
Database();

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS options configuration
const corsOptions = {
  origin: "https://mydemoschool.vercel.app/", // Correct URL (no trailing slash)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions)); // Apply CORS middleware with options

// Routes
const ContactRouter = require("./Routes/ContactRouter");
const NoticeRouter = require("./Routes/NoticeRouter");
const UserRouter = require("./Routes/UserRouter");
const UploadsRouter = require("./Routes/UploadsRouter");
const EventRouter = require("./Routes/EventRouter");

app.use("/api/contact", ContactRouter);
app.use("/api/notice", NoticeRouter);
app.use("/api/auth", UserRouter);
app.use("/api/upload", UploadsRouter);
app.use("/api/event", EventRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handling for any unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
