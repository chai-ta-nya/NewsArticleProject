let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config(); // Load env vars

const rt = require("./routes/route");

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected");
}).catch((err) => console.error("MongoDB error:", err));

let app = express();
app.use(express.json());
app.use(cors());
app.use("/", rt);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
