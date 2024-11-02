"use server"
import prisma from "@/lib/db"
import { getVerificationTokenByToken } from "../Data/Token/GET";
import { GetUserByEmail } from "../Data/User/GET";

export const newVerification = async(token: string) => {
    const db = prisma;
    const existing_token = await getVerificationTokenByToken(token);

    if(!existing_token){
        return {
            error: "No Token Exists!"
        }
    }
    const hasExpired = new Date() > new Date(existing_token.expires);

    if(hasExpired){
        return {
            error: "Token has Expired. Please Try Again."
        }
    }

    const user = await GetUserByEmail(existing_token.email);

    if(!user){
        return {
            error: "Email does not exists!"
        }
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data:{
            emailVerified: new Date(),
            email: user.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existing_token.id,
        }
    })

    return {
        success: "Email Verified"
    }
}