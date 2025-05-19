// app/api/login/route.js
import connectDb from "@/lib/dbConnection";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { error } from "console";

export async function POST(req : NextRequest) {
    try{


    const { email, password } = await req.json();

    //server slide validation 
    if(email.length <= 0 || password.length <6){
        return NextResponse.json({error :"Invalid Email or password "},{status : 401})
    }

 await connectDb();

 const userfind = await User.findOne({email})


 if(!userfind){
    return NextResponse.json({error :"Invalid Email or password"},{status : 400})
 }



      let match = await bcrypt.compare(password,userfind.password)
      if (match) {
        // return NextResponse.json({ message: "Valid User ID" }, { status: 200 });
        const tokenData ={
          email:userfind.email,
          id : userfind._id   
        }
        const key = "R8f!d$2gL@xQ7vZ9^Bc&Tn#MpW4uY$eJ"

        if(!key){
         return NextResponse.json({ error: "Server config error" }, { status: 500 });

        }else{
          const token = jwt.sign(tokenData,key,{expiresIn:"1h"});
          const response = NextResponse.json({message :"Login successful",token},{status:200})
          response.cookies.set("token",token,{
            httpOnly : true,
             secure: process.env.NODE_ENV === "production", // only secure in prod
             path: "/",
          })
          response.cookies.set("role", userfind.role, {
          httpOnly: false, // Don't set httpOnly if you need to access from client-side
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
          return response;
        }
        

        
      }
      else{
          return NextResponse.json({error :"Invalid Email or password"},{status : 402})
          // return NextResponse.json({ password, name: userfind.username });

      }
}
catch (err: any) {
  //  console.error("Login error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }

 
}
