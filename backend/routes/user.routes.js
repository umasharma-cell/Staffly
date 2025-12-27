const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists, please login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup Successful" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Store `id` instead of `userId`
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login Successful", token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
