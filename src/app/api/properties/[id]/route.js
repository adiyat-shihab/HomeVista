import MongodbConnect from "@/database/mongodbConnect";
import propertyModel from "@/model/storeProperty";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();
  console.log('hitting');
  console.log(id);
  MongodbConnect();
  await propertyModel.findByIdAndUpdate(id, data);
  return NextResponse.json(
    { message: "Property updated successfully" },
    { status: 200 }
  );
}
export async function GET(req, { params }) {
  const { id } = params;
  await MongodbConnect();
  const Properties = await propertyModel.findOne({ _id: id });
  return NextResponse.json({ Properties }, { status: 200 });
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    MongodbConnect();
    const query = { _id: new ObjectId(id) };
    const res = await propertyModel.deleteOne(query);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ message: "something  worng" });
  }
}
