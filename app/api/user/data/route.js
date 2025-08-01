import  { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../config/db";
import { NextResponse } from "next/server";

export async function GET(request){
 try{

const  { userId } = getAuth(request)

await connectDB()
const user = await User.findById(userId)

if(!user){
return NextResponse.json({ success:false, error: "User not found" }, { status: 404 })
}
return NextResponse.json({ success:true, user }, { status: 200 })
 } catch(error){
 return NextResponse.json({ success:false, error: "Internal Server Error" }, { status: 500 })
 } 
}