import MongodbConnect from "@/database/mongodbConnect";
import reportModel from "@/model/propertyReport";
import propertyModel from "@/model/storeProperty";
import { NextResponse } from "next/server";

export async function GET(req) {

  try {
    MongodbConnect();
    const data = await reportModel.aggregate([
      {
        $lookup: {
          from: "properties", // Name of the collection to join with
          localField: "propertyId", // Field from the reports collection
          foreignField: "_id", // Field from the properties collection
          as: "propertyData", // Output array field
        },
      },
      {
        $unwind: "$propertyData", // Unwind the propertyData array
      },
      {
        $project: {
          // Exclude _id from the propertyData
          "propertyData._id": 0,
        },
      },
    ]);

    console.log(data);

    return NextResponse.json({ status: "ok", data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: "!ok", message: err });
  }
}
