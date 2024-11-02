"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/lib/schema/LoginSchema"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import * as z from "zod"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import { GetUserByEmail } from "@/actions/Data/User/GET"

export const signInProvider = async (provider: 'google' | 'github' | 'twitter' | 'linkedin') => {
    try {
        if(provider === 'twitter'){
            await signIn("twitter");
            return;
        }
        await signIn(provider);
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        "error" : "Incorrect Username or Password!",
                        success_status: false
                    }

                    case "UntrustedHost":
                        return {
                            "error" : "Untrusted host",
                            success_status: false
                        }
                    case "AccessDenied":
                        return {
                            "error" : "Please Verify Your Email to Login.",
                            success_status: false
                        }
            
                default:
                    return {
                        "error" : "Something Went Wrong!",
                        success_status: false
                    }
            }
        }
        throw error;
    }
    return {success: "Succeccfully Logged In"}
};

export const Login = async (credentials : z.infer<typeof LoginSchema>) => {
    const {
        data,
        success
    } = LoginSchema.safeParse(credentials)
    
    if(!success){
        return {
            "error" : "Invalid Credentials!",
            success_status: false
        }
    }

    const {
        email,
        password
    } = data;

    const existingUser = await GetUserByEmail(email);

    if(!existingUser || !existingUser.email){
        return {
            "error" : "Email does not Exist!",
            success_status: false
        }
    }

    if(!existingUser.password){
        return {
            "error" : "Please login using correct provider",
            success_status: false
        }
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {
            "success" : "Verification Email Sent.",
            success_status: true
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        "error" : "Incorrect Username or Password!",
                        success_status: false
                    }

                    case "UntrustedHost":
                        return {
                            "error" : "Untrusted host",
                            success_status: false
                        }
                    case "AccessDenied":
                        return {
                            "error" : "Please Verify Your Email to Login.",
                            success_status: false
                        }
            
                default:
                    return {
                        "error" : "Something Went Wrong!",
                        success_status: false
                    }
            }
        }
        throw error;
    }

    return {
        "success" : "Email Sent!",
        success_status:true
    }
}