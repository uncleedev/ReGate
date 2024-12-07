import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { connectMongoDB } from "./lib/mongodb";
import Admin from "./models/adminSchema";
import Student from "./models/studentSchema";
import Instructor from "./models/instructorSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            async authorize(credentials) {
                const { email, password, role } = credentials;
                let user = null;

                await connectMongoDB();

                switch (role) {
                    case 'admin':
                        user = await Admin.findOne({ email }).select("+password +role");
                        break;
                    case 'student':
                        user = await Student.findOne({ email }).select("+studentNo +password +role");
                        break;
                    case 'instructor':
                        user = await Instructor.findOne({ email }).select("+instructorNo +password +role");
                        break;
                    default:
                        throw new Error("Invalid role");
                }

                if (user && await bcrypt.compare(password, user.password)) {
                    return { 
                        id: user._id, 
                        instructorNo: user?.instructorNo, 
                        studentNo: user?.studentNo, 
                        email: user.email, 
                        role: user.role 
                    };
                }

                throw new Error("Invalid Credentials");
            }
        })
    ],

    callbacks: {
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub;
                session.user.role = token.role;
                session.user.studentNo = token.studentNo; 
                session.user.instructorNo = token.instructorNo; 
            }

            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.studentNo = user.studentNo; 
                token.instructorNo = user.instructorNo;
                token.sub = user.id;
            }

            return token;
        },

        signIn: async ({ user, account }) => {
            if (account?.provider === 'credentials') {
                return true;
            } else {
                return false;
            }
        }
    }
});