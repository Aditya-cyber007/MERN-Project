const {z} = require('zod');

//create schema for register
const registerSchema = z.object({
    username: z
    .string({required_error : "username is requird"  }).trim()
    .min(3,{message : "name must be atleast of 3 characters"})
    .max(20,{message : "name should not be more than of 20 characters"}),

    email: z
    .string({required_error : "Email is requird"  }).trim()
    .email({message : "Invalid email address"})
    .min(3,{message : "email must be atleast of 3 characters"})
    .max(50,{message : "email should not be more than of 50 characters"}),

    phone: z
    .string({required_error : "Phone is requird"  }).trim()
    .min(10,{message : "phone must be atleast of 10 characters"})
    .max(10,{message : "phone should not be more than of 10 characters"}),

    password: z
    .string({required_error : "Password is requird"  }).trim()
    .min(8,{message : "password must be atleast of 8 characters"})
    .max(20,{message : "password should not be more than of 20 characters"}),
});

//create schema for login

const loginSchema = z.object({
    email: z
    .string({required_error : "Email is requird"  }).trim()
    .email({message : "Invalid email address"})
    .min(3,{message : "email must be atleast of 3 characters"})
    .max(50,{message : "email should not be more than of 50 characters"}),

    password: z
    .string({required_error : "Password is requird"  }).trim()
    .min(8,{message : "password must be atleast of 8 characters"})
    .max(20,{message : "password should not be more than of 20 characters"}),
});

module.exports = {
    registerSchema,
    loginSchema
}