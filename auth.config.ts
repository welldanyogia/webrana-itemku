import type {NextAuthConfig} from "next-auth"
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {LoginSchema} from "@/schemas";

import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google";

export default {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            name:"credentials",
            authorize: async (credentials) => {
                if (!credentials){
                    return null
                }
                let user = null
                const validatedFields = LoginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data
                    // logic to salt and hash password
                    const pwHash = await bcrypt.hash(password, 10)

                    // logic to verify if user exists
                    user = await getUserByEmail(email)

                    if (!user || !user.password) return null

                    const passwdMatch = await bcrypt.compare(password, user.password)

                    // return user object with the their profile data
                    if (passwdMatch) return user
                }
                return null

            },
        }),
        GitHub,
        Google
    ]
} satisfies NextAuthConfig

