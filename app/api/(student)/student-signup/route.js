import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const {studentNo, email, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB()
        await Student.create({studentNo, email, password: hashedPassword})

        return NextResponse.json({message : "Student created successfully"}, {status : 201})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "An error occured while creating student"}, {status : 500})
    }
} 

