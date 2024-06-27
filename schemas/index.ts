import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message:"Email is required."
    }),
    password : z.string().min(1,{
        message:"Password is required."
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Email is required."
    }),
    name : z.string().min(1,{
        message:"Name is required."
    }),
    password : z.string().min(8,{
        message:"Minimum 8 characters required."
    }),
});

export const DigiAuthSchema = z.object({
    id : z.bigint(),
    username : z.string(),
    api_key : z.string(),
    digi_balance: z.bigint()
});