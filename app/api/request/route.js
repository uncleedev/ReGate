import { connectMongoDB } from "@/lib/mongodb";
import Request from "@/models/request";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { receiptNo, studentNo, formType, quantity, paymentMethod, paymentStatus, printStatus } = await req.json()

        await connectMongoDB()

        const request = await Request.create({ receiptNo, studentNo, formType, quantity, paymentMethod, paymentStatus, printStatus })

        return NextResponse.json({ message: "Request created successfully!", request }, { status: 201 })
    } catch (error) {
        console.log("ERROR: ", error)
        return NextResponse.json({ message: "An error occured while creating request", error: error.message }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectMongoDB()

        const requests = await Request.find()

        return NextResponse.json(requests, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while fetching requests", error: error.message }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const { id, receiptNo, studentNo, formType, quantity, paymentMethod, paymentStatus, printStatus } = await req.json()

        await connectMongoDB()

        const updateRequest = await Request.findByIdAndUpdate(
            id,
            { receiptNo, studentNo, formType, quantity, paymentMethod, paymentStatus, printStatus },
            {new: true, runValidators: true}
        )

        if (!updateRequest) {
            return NextResponse.json({ message: "Request not found!" }, { status: 404 })
        }

        return NextResponse.json({ message: "Request updated successfully", updateRequest }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while updating the request", error: error.message }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json()

        await connectMongoDB()

        const deleteRequest = await Request.findByIdAndDelete(id)

        if (!deleteRequest) {
            return NextResponse.json({ message: "Request not found!" }, { status: 404 })
        }

        return NextResponse.json({ message: "Request deleted successfully", deleteRequest }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured while deleting request", error: error.message }, { status: 500 })
    }
}