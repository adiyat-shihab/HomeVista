import MongodbConnect from "@/database/mongodbConnect";
import { NextResponse } from "next/server";
import reportModel from "@/model/propertyReport";

export async function PUT(req, res) {
  try {
    const data = await req.json();
    MongodbConnect();

    const query = { propertyId: data.propertyId, reporterId: data.reporterId };
    const isExist = await reportModel.findOne(query);
    if (isExist) {
      await reportModel.updateOne(query, {
        $set: {
          report: data.report,
        },
      });
      return NextResponse.json({ message: "Report updated" });
    } else {
      await reportModel.create({ ...data });
      return NextResponse.json({ message: "Report submitted" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: "An error occured" });
  }
}

export async function GET(req, res) {
  try {
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const reporterId = req.nextUrl.searchParams.get("reporterId");

    const query = { propertyId, reporterId };

    const isExist = await reportModel.findOne(query);

    if (isExist) {
      return NextResponse.json(isExist);
    }

    return NextResponse.json({ message: "Data not found" });
  } catch (err) {
    console.log(err);
  }
}
export async function DELETE(req, res) {
  try {
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const reporterId = req.nextUrl.searchParams.get("reporterId");

    console.log(propertyId, reporterId);

    const query = { propertyId, reporterId };
    MongodbConnect();
    const result = await reportModel.deleteOne(query);

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
}
