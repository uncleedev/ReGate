import { connectMongoDB } from "@/lib/mongodb";
import Announcement from "@/models/announcementSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { headline, caption, date, image } = await req.json();

        await connectMongoDB();

        const announcement = await Announcement.create({ headline, caption, date, image });

        return NextResponse.json({ message: "Announcement created successfully", announcement}, { status: 201 });
    } catch (error) {
        console.error("Error creating Announcement:", error);
        return NextResponse.json({ message: "An error occurred while creating Announcement", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();

        const announcement = await Announcement.find(); 

        return NextResponse.json(announcement, { status: 200 });
    } catch (error) {
        console.error("Error fetching Announcement:", error);
        return NextResponse.json({ message: "An error occurred while fetching Announcement", error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, headline, caption, date, image } = await req.json();

        await connectMongoDB();

        const updateAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { headline, caption, date, image },
            { new: true, runValidators: true } 
        );

        if (!updateAnnouncement) {
            return NextResponse.json({ message: "announcement not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "announcement updated successfully", updateAnnouncement}, { status: 200 });
    } catch (error) {
        console.error("Error updating announcement:", error);
        return NextResponse.json({ message: "An error occurred while updating the announcement", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        await connectMongoDB();

        const deleteAnnouncement= await Announcement.findByIdAndDelete(id); 

        if (!deleteAnnouncement) {
            return NextResponse.json({ message: "announcement not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "announcement deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ message: "An error occurred while deleting the announcement", error: error.message }, { status: 500 });
    }
}