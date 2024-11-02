import NextAuth from "next-auth"
import prisma from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config";
import { GetUserById } from "./actions/Data/User/GET";
const db = prisma;

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
		error: '/error'
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }){
			const existingUser = await GetUserById(user.id);
			if(account?.provider !== "credentials"){
				//allow OAuth users to login without email verification
				return true;
			}
			if(!existingUser || !existingUser?.emailVerified){
				//dont allow non verified users to login
				return false;
			}
			// TODO : Add 2FA check
			return true;
		},
		async jwt({token}){
			if(!token.sub) return token; //User Logged Out
			const existingUser = await GetUserById(token.sub);
			if(!existingUser) return token;
			token.role = existingUser.role;
			return token;
		},
		async session({session, token}){
			if(token.sub && session.user){
				session.user.id = token.sub;
			}
			if(token.role && session.user){
				session.user.role = token.role;
			}
			return session;
		}
	},
	...authConfig
})