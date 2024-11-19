import { connectMongoDB } from "@/lib/mongodb";
import Instructor from "@/models/instructor"
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const {instructorNo, email, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB()
        await Instructor.create({instructorNo, email, password: hashedPassword})

        return NextResponse.json({message : "Instructor created successfully"}, {status : 201})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "An error occured while creating instructor"}, {status : 500})
    }
}