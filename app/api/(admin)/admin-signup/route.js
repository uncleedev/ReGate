import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import Admin from "@/models/admin";

export async function POST(req) {
    try {
        const {email, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB()
        await Admin.create({ email, password: hashedPassword})

        return NextResponse.json({message : "Admin created successfully"}, {status : 201})
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({message: "An error occured while creating admint"}, {status : 500})
    }
}