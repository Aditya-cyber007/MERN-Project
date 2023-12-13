const express = require("express");
const { home, register, login,user } = require("../Controler/auth-controller");
const router = express.Router();
const { registerSchema, loginSchema } = require("../Validator/auth-validator");
const validate = require("../Middleware/validate-middleware");
const authMiddleware = require("../Middleware/auth-middleware");

router.route("/").get(home);
router.route("/register").post(validate(registerSchema),register);
router.route("/login").post( validate(loginSchema),login);
router.route("/user").get(authMiddleware, user)

module.exports = router;
