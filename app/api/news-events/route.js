import { connectMongoDB } from "@/lib/mongodb";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { headline, caption, image } = await req.json();
        console.log("Received payload:", { headline, caption, image });

        await connectMongoDB();
        await Admin.create({ headline, caption, image });

        return NextResponse.json({ message: "News and events created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating news and events:", error);
        return NextResponse.json({ message: "An error occurred while creating news and events" }, { status: 500 });
    }
}