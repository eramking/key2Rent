// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require('../api/auth/auth.routes');


dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port at  http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
