const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the Customer schema

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    });

// secure the password with the bcrypt
customerSchema.pre("save", async function () {
    const customer = this;
    console.log("actual data ", this);

    if (!customer.isModified) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(customer.password, saltRound);
        customer.password = hashedPassword;
    } catch (error) {
        return next(error);
    }
});

customerSchema.methods.generateToken = async function () {
    const customer = this;
    try {
        const token = jwt.sign(
            { _id: customer._id.toString(), email: customer.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return token;
    } catch (error) {
        return next(error);
    }
}

customerSchema.methods.matchPassword = async function (password) {
    const customer = this;
    try {
        const isMatch = await bcrypt.compare(password, customer.password);
        return isMatch;
    } catch (error) {
        return next(error);
    }
}

const Customer = mongoose.model("Customer", customerSchema);

// Export the model
module.exports = Customer;
