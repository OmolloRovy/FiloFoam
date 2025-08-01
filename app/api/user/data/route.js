import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../config/db";
import User from "@/models/User"; 
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request) {
  try {
    const { userId } = getAuth(request); 
    console.log("User ID:", userId)

    if (!userId) {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}
    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch (error) {
    console.error("User API error:", error); 
    return NextResponse.json({ success: false, error: error.message }, { status: 500 }); 
  }
} 
