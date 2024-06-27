"use server"
import * as z from "zod"
import {LoginSchema, RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs"
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";


// TODO 2 : WATCH https://youtu.be/1MTyCvS05V4?si=mFbFRcBpj_fL7T5i&t=8642
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Invalid Fields!"}
    }

    const {email, password, name} = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: "Email already registered!"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO: Send Verification Token Email

    return {success: "User Created!"};
}