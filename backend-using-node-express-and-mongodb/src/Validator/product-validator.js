const {z} = require('zod');

const productRegisterSchema = z.object({
    name: z
    .string({required_error : "username is requird"  }).trim()
    .min(3,{message : "name must be atleast of 3 characters"})
    .max(20,{message : "name should not be more than of 20 characters"}),

    price: z
    .string({required_error : "price is requird"  }).trim()
    .min(1,{message : "price must be atleast of 1 characters"})
    .max(100000,{message : "price should not be more than of 100000 characters"}),

    img: z
    .string({required_error : "img is requird"  }).trim()
    .url({message : "Invalid url address"}),

    description: z
    .string({required_error : "description is requird"  }).trim()
    .min(3,{message : "description must be atleast of 3 characters"})
    .max(1000,{message : "description should not be more than of 1000 characters"}),

    category: z
    .string({required_error : "category is requird"  }).trim()
    .min(3,{message : "category must be atleast of 3 characters"})
    .max(20,{message : "category should not be more than of 20 characters"}),

    email: z
    .string({required_error : "Email is requird"  }).trim()
    .email({message : "Invalid email address"})
    .min(3,{message : "email must be atleast of 3 characters"})
    .max(50,{message : "email should not be more than of 50 characters"}),

    quantity: z
    .string({required_error : "quantity is requird"  }).trim()
    .min(1,{message : "quantity must be atleast of 1 characters"})
    .max(100000,{message : "quantity should not be more than of 100000 characters"}),
    

});

module.exports = {
    productRegisterSchema
}