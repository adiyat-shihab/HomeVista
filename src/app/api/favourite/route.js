import MongodbConnect from "@/database/mongodbConnect";
import favModel from "@/model/favouriteProperty";
import propertyModel from "@/model/storeProperty";
import { NextResponse } from "next/server";

// Get API to check if property is already favorite
export async function GET(req) {
  try {
    // Connecting to the database
    MongodbConnect();

    // Getting ids from search params
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const userId = req.nextUrl.searchParams.get("userId");

    console.log(propertyId);
    console.log(userId);

    if (
      (propertyId === null || propertyId === undefined) &&
      userId !== null &&
      userId !== undefined
    ) {
      const favIdList = await favModel.find({ userId });

      const propertyIds = favIdList.map((data) => data.propertyId);
      const filteredPropertyIds = propertyIds.filter(
        (data) => data !== undefined
      );

      const propertiesData = await propertyModel.find({
        _id: { $in: filteredPropertyIds },
      });

      if (propertiesData.length !== 0) {
        return NextResponse.json({ data: propertiesData });
      } else {
        return NextResponse.json({ data: [], status: "!ok" });
      }
    } else {
      // Query for checking if id is in the database
      const query = { propertyId, userId };

      // Finding user favorite for this property
      const isExist = await favModel.findOne(query);
      const allFav = await favModel.find({ propertyId });
      const allFavLength = allFav.length;

      // Sending response for result
      if (isExist) {
        return NextResponse.json({
          favCount: allFavLength,
          isFound: true,
          status: "ok",
        });
      } else {
        return NextResponse.json({
          favCount: allFavLength,
          isFound: false,
          status: "!ok",
        });
      }
    }
  } catch (err) {
    // Catching err if one
    console.error("GET request error:", err);
    return NextResponse.error(500, "Internal Server Error");
  }
}

// PUT API for adding property to favorite
export async function PATCH(req) {
  try {
    // Getting search params from url
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const userId = req.nextUrl.searchParams.get("userId");

    // Connecting to the database
    MongodbConnect();

    // Query for checking if the data is already inserted
    const query = { propertyId, userId };

    // Searching for data in database
    const isFavExist = await favModel.findOne(query);

    // If data is not available then create one else send message
    if (!isFavExist) {
      const res = await favModel.create({ propertyId, userId });
      if (res) {
        return NextResponse.json({
          status: "ok",
          message: "Added to favorite",
        });
      } else {
        return NextResponse.error(500, "Failed to add to favorite");
      }
    } else {
      const res = await favModel.deleteOne(query);

      if (res) {
        return NextResponse.json({
          status: "ok",
          message: "Removed from favorite",
        });
      } else {
        return NextResponse.error(500, "Failed to remove from favorite");
      }
    }
  } catch (err) {
    console.error("PUT request error:", err);
    return NextResponse.error(500, "Internal Server Error");
  }
}
export async function DELETE(req) {
  try {
    // Getting search params from url
    const propertyId = req.nextUrl.searchParams.get("propertyId");
    const userId = req.nextUrl.searchParams.get("userId");

    // Connecting to the database
    MongodbConnect();

    console.log(propertyId, userId);
    // Query for checking if the data is already inserted
    const query = { propertyId, userId };

    const res = await favModel.deleteOne(query);

    console.log(res);

    if (res.deletedCount === 1) {
      return NextResponse.json({
        status: "ok",
        message: "Removed from favourite",
      });
    } else {
      return NextResponse.json({status: "!ok", message: "Something went wrong"});
    }
  } catch (err) {
    console.error("PUT request error:", err);
    return NextResponse.error(500, "Internal Server Error");
  }
}
