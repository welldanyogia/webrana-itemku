import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {db} from "@/lib/db";

const prisma = new PrismaClient()
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})