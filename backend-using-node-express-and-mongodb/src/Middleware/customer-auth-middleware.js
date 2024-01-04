const jwt = require("jsonwebtoken");
const Customer = require("../Model/customer-auth-model");

const customerAuthMiddleware = async (req, res, next) => {
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
        const customerData = await Customer.findOne({ email : decoded.email}).select({password:0});
        req.customer = customerData;
        req.token = token;
        req.customerId = customerData._id;
        next();
    } catch (error) {
        const err = {
        status: 401,
        message: "Invalid token",
        };
        next(err);
    }
    }

module.exports = customerAuthMiddleware;
