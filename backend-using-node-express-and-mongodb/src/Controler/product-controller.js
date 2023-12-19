const Product = require("../Model/product-model");

const product = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const registerProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { name, price, img, description, category,email,quantity } = req.body;
        
        await Product.create({ name, price, img, description, category,email,quantity },


        ).then( (product) => {
            res.status(201).json({
                msg: "Product registered successfully",
                product: product,
            }); 
        }
        ).catch((err) => {
            res.status(500).json({
                msg: err,
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            msg: "Product deleted successfully",
            product:product
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, img, description, category,email,quantity } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, price, img, description, category,email,quantity }, { new: true });
        res.status(200).json({
            msg: "Product updated successfully",
            product: product,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const searchedproducts = async (req, res) => {
    try {
        const { name } = req.params;
        
        // const product = await (Product.find({ name: { $regex: name, $options: "i" } }) || Product.findById(name));
        //searching by name or by id
        const product = await Product.find({ $or: [{ name: { $regex: name, $options: "i" } }, { _id: name }] });

        res.status(200).json({
            msg: "Product searched successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProductbyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const product = await Product.find({ email: { $regex: email, $options: "i" } });
        res.status(200).json({
            msg: "Product searched successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports =  {registerProduct,  product, deleteProduct, updateProduct,searchedproducts,getProductbyEmail} ;
