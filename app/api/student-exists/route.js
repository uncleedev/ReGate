import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/studentSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();

        const { studentNo, email } = await req.json();
        const student = await Student.findOne({
            $or: [{ studentNo }, { email }]
        }).select("_id studentNo email");

        return NextResponse.json({ student });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}