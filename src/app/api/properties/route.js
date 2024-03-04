import MongodbConnect from "@/database/mongodbConnect";
import propertyModel from "@/model/storeProperty";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await MongodbConnect();
    await propertyModel.create(data);
    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(req) {
  try {
    const title = req.nextUrl.searchParams.get("title");
    await MongodbConnect();
    if (title === "undefined" || title === null) {
      const data = await propertyModel.find();
      const dataCount = await propertyModel.countDocuments({});
      if (data) {
        return NextResponse.json({ data, dataCount });
      }
      return NextResponse.json({ message: "error" });
    } else {
      const query = title;
      const data = await propertyModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
        ],
      });
      return NextResponse.json({ data });
    }
  } catch (error) {
    return NextResponse.json({ data: [], error: error.message });
  }
}


