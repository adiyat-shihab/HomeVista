import MongodbConnect from "@/database/mongodbConnect";
import favModel from "@/model/favouriteProperty";
import { NextResponse } from "next/server";

// Get API to check if property is already favourite
export async function GET(req) {
  try {
    // getting ids from search params
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const userId = req.nextUrl.searchParams.get("userId");

    // connecting to the database
    MongodbConnect();

    // query for checking if id is in the database
    const query = { propertyId, userId };

    // finding user favourite for this property
    const isExist = await favModel.findOne(query);
    const allFav = await favModel.find({ propertyId });
    const allFavLength = allFav.length;

    // sending response for result
    if (isExist) {
      return NextResponse.json({
        favCount: allFavLength,
        isFound: true,
        status: "ok",
      });
    }
    return NextResponse.json({
      favCount: allFavLength,
      isFound: false,
      status: "!ok",
    });
  } catch (err) {
    // catching err if one
    console.log(err);
    return NextResponse.json({ message: "something wrong" });
  }
}

// PUT API for adding property to favourite
export async function PUT(req) {
  try {
    // getting search params from url
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const userId = req.nextUrl.searchParams.get("userId");

    // connecting to the database
    MongodbConnect();

    // query for checking if the data is already inserted
    const query = { propertyId, userId };

    // searching for data in database
    const isFavExist = await favModel.findOne(query);

    // if data is not available then create one else send message
    if (!isFavExist) {
      const res = await favModel.create({ propertyId, userId });
      if (res) {
        return NextResponse.json({
          status: "ok",
          message: "Added to favourite",
        });
      }
    } else {
      const res = await favModel.findOneAndDelete(query);
      if (res) {
        return NextResponse.json({
          status: "ok",
          message: "Removed from favourite",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err });
  }
}

// // DELETE API for un favourite a property
// export async function DELETE(req) {

//   // getting ID's from search params in url
//   const propertyId = req.nextUrl.searchParams.get("propertyId");
//   const userId = req.nextUrl.searchParams.get("userId");

//   // Connecting to the database
//   MongodbConnect();

//   // deleting data from database
//   const res = await favModel.findOneAndDelete({ propertyId, userId });

//   // if delted than send response
//   if (res) {
//     return NextResponse.json({
//       status: "ok",
//       deleted: true,
//       message: "Removed form favourite",
//     });
//   }

//   // if not data deleted than send response
//   return NextResponse.json({ message: "property not found" });
// }
