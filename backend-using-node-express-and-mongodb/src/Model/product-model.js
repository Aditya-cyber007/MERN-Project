const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },


})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;