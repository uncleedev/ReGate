import { NextResponse } from "next/server"

export  async function GET() {
   try {
        const response = await fetch("https://uncleedev.github.io/apis/students.json")

        if (!response.ok) {
            return NextResponse.json({message: "Failed to fetch data"}, {status: 500})
        }

        const data = await response.json()

        return NextResponse.json({message :"Successfully fetching data", data}, {status: 200})
   } catch (error) {
        return NextResponse.json({message: "Failed to fetch data"}, {status: 500})
   }


}