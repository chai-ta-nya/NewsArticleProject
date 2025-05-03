const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rt = require("./routes/route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", rt);

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/newsarticledb")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
