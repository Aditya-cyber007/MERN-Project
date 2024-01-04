const Customer = require("../Model/customer-auth-model")

const registerCustomer = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const customerExists =  await Customer.findOne({email: email});
        if(customerExists){
            return res.status(400).json({msg: "Email already exists"});
        }
        const customerCreated = await Customer.create({username, email, phone, password});
        res.status(201).json({msg: customerCreated, token: await customerCreated.generateToken(), _id: customerCreated._id.toString()});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

const loginCustomer = async (req, res) => {
    try {
        const {email, password} = req.body;
        const customerExists = await Customer.findOne({email: email});
        if(!customerExists){
            return res.status(400).json({msg: "Invalid email credential"});
        }
        const isMatch = await customerExists.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid password credential"});
        }
        res.status(200).json({msg: "Login successful", token: await customerExists.generateToken(), _id: customerExists._id.toString()});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

const user = async (req, res) => {
    try {
        const customer = await req.customer;
        const token = await req.token;
        console.log(customer)
        res.status(200).json({customer});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}



module.exports = {registerCustomer, loginCustomer, user};