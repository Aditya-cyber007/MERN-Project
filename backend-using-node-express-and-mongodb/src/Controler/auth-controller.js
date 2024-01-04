const bcrypt = require("bcrypt");
const User = require("../Model/auth-model");

const home = async (req, res) => {
  try {
    //show all users
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(201)
      .json({
        msg: userCreated,
        token: await userCreated.generateToken(),
        _id: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid email Credential" });
    }
    const isMatch = await userExist.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password Credential " });
    }
    res
      .status(200)
      .json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        _id: userExist._id.toString(),
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const user = async (req, res) => {
  try {
    const user = await req.user;
    const token = await req.token;
    console.log(user)
    res.status(200).json({ user });
    

  } catch (error) {
     res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, user }; 
