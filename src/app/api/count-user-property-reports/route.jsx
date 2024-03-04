import MongodbConnect from "@/database/mongodbConnect";
import reportModel from "@/model/propertyReport";
import propertyModel from "@/model/storeProperty";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    MongodbConnect();
    const totalUsers = await User.countDocuments();
    const totalProperty = await propertyModel.countDocuments();
    const totalReports = await reportModel.countDocuments();

    return NextResponse.json({
      status: "ok",
      usersCount: totalUsers,
      propertyCount: totalProperty,
      reportsCount: totalReports,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "something went wrong" });
  }
}
