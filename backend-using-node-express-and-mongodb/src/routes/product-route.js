const express = require("express");
const router = express.Router();
const { product, registerProduct, deleteProduct, updateProduct, searchedproducts, getProductbyEmail } = require("../Controler/product-controller");
const validate = require("../Middleware/validate-middleware");
const { productRegisterSchema } = require("../Validator/product-validator");


router.route("/").get(product);
router.route("/register").post(validate(productRegisterSchema),registerProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/update/:id").put(validate( productRegisterSchema  ), updateProduct);
router.route("/search/:name").get(searchedproducts);
router.route("/search/email/:email").get(getProductbyEmail);


module.exports = router;

// 