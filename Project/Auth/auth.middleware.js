const jwt = require("jsonwebtoken");
const userModal = require("../Model/user.Model");

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ msg: "Invalid Token" });
        }
        const user = await userModal.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = auth;
