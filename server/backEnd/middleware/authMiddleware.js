// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the request header (sent by frontend)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to the request so next middleware can use it
    req.user = { id: decoded.userId };

    // Continue to the next middleware/route handler
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
