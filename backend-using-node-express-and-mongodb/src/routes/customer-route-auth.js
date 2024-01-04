const express = require("express");
const {registerCustomer, loginCustomer, user} = require("../Controler/customer-auth-controller");
const router = express.Router();
const validate = require("../Middleware/validate-middleware");
const{customerRegisterSchema, customerLoginSchema} = require("../Validator/customer-auth-validator");
const customerAuthMiddleware = require("../Middleware/customer-auth-middleware");


router.route("/register").post(validate(customerRegisterSchema),registerCustomer);
router.route("/login").post(validate(customerLoginSchema),loginCustomer);
router.route("/user").get(customerAuthMiddleware, user)

module.exports = router;
