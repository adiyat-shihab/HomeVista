import { authContext } from "@/context/authContext/AuthProvider";
import { NextResponse } from "next/server";
import { useContext } from "react";


export async function GET(req) {
    try {
        const { currentUser } = useContext(authContext);
        const email = currentUser.email;
        await MongodbConnect();
        console.log(email);
        if (email === "undefined" || email === null) {
            const data = await propertyModel.find();
            console.log(data);
            if (data) {
                return NextResponse.json({ data });
            }
            return NextResponse.json({ message: "error" });
        } else {
            const query = email;
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
