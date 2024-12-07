import { connectMongoDB } from "@/lib/mongodb";
import Instructor from "@/models/instructorSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();

        const { instructorNo, email } = await req.json();
        const instructor = await Instructor.findOne({
            $or: [{ instructorNo }, { email }]
        }).select("_id instructorNo email");

        return NextResponse.json({ instructor });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}