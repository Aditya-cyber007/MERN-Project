const jwt = require("jsonwebtoken");
const User = require("../Model/auth-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        const err = {
            status: 401,
            message: "No token, authorization denied",
        };
        next(err);
        
        
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findOne({ email : decoded.email}).select({password:0});
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        const err = {
        status: 401,
        message: "Invalid token",
        };
        next(err);
    }
    }

module.exports = authMiddleware;