import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import Instructor from "@/models/instructor";
import Admin from "@/models/admin";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "instructor-signin",
            name: "Instructor Credentials",
            credentials: {},
            async authorize(credentials) {
                const { instructorNo, password } = credentials;
        
                try {
                    await connectMongoDB();
                    const instructor = await Instructor.findOne({ instructorNo });
        
                    if (!instructor) {
                        return null;
                    }
        
                    const passwordMatch = await bcrypt.compare(password, instructor.password);
        
                    if (!passwordMatch) {
                        return null;
                    }
        
                    return instructor; 
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),
        
        CredentialsProvider({
            id: "student-signin",
            name: "Student Credentials",
            credentials: {},
            async authorize(credentials) {
                const { studentNo, password } = credentials;

                try {
                    await connectMongoDB();
                    const student = await Student.findOne({ studentNo });

                    if (!student) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, student.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return student
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),

        CredentialsProvider({
            id: "admin-signin",
            name: "Admin Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const admin = await Admin.findOne({ email });

                    if (!admin) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, admin.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return admin; 
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),

    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };