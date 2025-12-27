const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const token = req.header("auth"); 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email }; // ✅ Ensure `id` is assigned
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
