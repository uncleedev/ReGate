import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            

            async authorize(credentials) {
                const { studentNo, email, password } = credentials

                try {
                    await connectMongoDB()
                    const student = await Student.findOne({ studentNo })

                    if (!student) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, student.password)

                    if (!passwordMatch) {
                        return null
                    }

                    return student
                } catch (error) {
                    console.log("Error: ", error)
                }
                
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/student/signin",
        instructorSignin: "/instructor/signin"
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}