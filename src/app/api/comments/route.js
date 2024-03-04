import MongodbConnect from "@/database/mongodbConnect";
import commentModel from "@/model/comments";
import propertyModel from "@/model/storeProperty";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();
        await MongodbConnect();
        await commentModel.create(data);
        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
}
export async function GET(req) {
    try {
        await MongodbConnect();
        const data = await commentModel.find();
        if (data) {
            return NextResponse.json({ data });
        }
        return NextResponse.json({ message: "error" });
    } catch (error) {
        return NextResponse.json({ data: [], error: error.message });
    }
}


