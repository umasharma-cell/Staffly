const express = require("express");
const cors = require("cors"); 
const { connection } = require("./config/db");
const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employeeRoutes"); // Import Employee Routes
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
}));

let port = process.env.PORT || 4000;

// Root Route
app.get("/", (req, res) => {
    res.send("API is working");
});

// User Authentication Routes
app.use("/auth", userRoutes);

// Employee Management Routes
app.use("/employees", employeeRoutes);

// Protected Route Example
app.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// Start Server
app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to Database Successfully");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
    console.log(`Server is running on http://localhost:${port}`);
});
