"use server"
import prisma from "@/lib/db"
import { RegisterSchema } from "@/lib/schema/RegisterSchems"
import * as z from "zod"
type schema_type = z.infer< typeof RegisterSchema >
import bcrypt from "bcryptjs"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import { GetUserByEmail, GetUserByUsername } from "../Data/User/GET"

const Register = async (credentials : schema_type) => {
    const {
        success,
        data
    } = RegisterSchema.safeParse(credentials)

    if(!success){
        return {
            'error' : 'Invalid Credentials!'
        }
    }

    const user = await GetUserByEmail(data.email);
    if(user){
        return {
            'error' : 'User Already Registered! Please Login.'
        }
    }

    const user_by_username = await GetUserByUsername(data.username);
    if(user_by_username){
        return {
            'error' : 'Username is Already Taken.'
        }
    }

    const db = prisma;
    const hashed_password = await bcrypt.hash(data.password, 10);

    await db.user.create({
        data: {
            email: data.email,
            password: hashed_password,
            userName: data.username,
            image: data.image
        }
    })

    const verificationToken = await generateVerificationToken(data.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        'success' : 'Confirmation Email Sent!.'
    }
}

export default Register;