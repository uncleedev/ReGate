import { connectMongoDB } from "@/lib/mongodb";
import NewsEvent from "@/models/news-eventsSchema";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { headline, caption, date, image } = await req.json();

        await connectMongoDB();

        const newsEvent = await NewsEvent.create({ headline, caption, date, image });

        return NextResponse.json({ message: "News and events created successfully", newsEvent }, { status: 201 });
    } catch (error) {
        console.error("Error creating news and events:", error);
        return NextResponse.json({ message: "An error occurred while creating news and events", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();

        const newsEvents = await NewsEvent.find(); 

        return NextResponse.json(newsEvents, { status: 200 });
    } catch (error) {
        console.error("Error fetching news and events:", error);
        return NextResponse.json({ message: "An error occurred while fetching news and events", error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, headline, caption, date, image } = await req.json();

        await connectMongoDB();

        const updatedNewsEvent = await NewsEvent.findByIdAndUpdate(
            id,
            { headline, caption, date, image },
            { new: true, runValidators: true } 
        );

        if (!updatedNewsEvent) {
            return NextResponse.json({ message: "News event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "News event updated successfully", updatedNewsEvent }, { status: 200 });
    } catch (error) {
        console.error("Error updating news event:", error);
        return NextResponse.json({ message: "An error occurred while updating the news event", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        await connectMongoDB();

        const deletedNewsEvent = await NewsEvent.findByIdAndDelete(id); 

        if (!deletedNewsEvent) {
            return NextResponse.json({ message: "News event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "News event deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting news event:", error);
        return NextResponse.json({ message: "An error occurred while deleting the news event", error: error.message }, { status: 500 });
    }
}