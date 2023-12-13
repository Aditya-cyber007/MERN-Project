const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure the password with the bcrypt
userSchema.pre("save", async function () {
  const user = this;
  console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.generateToken = async function () {
  const user = this;
  try {
    const token = jwt.sign(
      { _id: user._id.toString(),email:user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    return next(error);
  }
};

userSchema.methods.matchPassword = async function (password) {
  const user = this;
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

const User = new mongoose.model("USER", userSchema);

module.exports = User;
