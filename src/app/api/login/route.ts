// app/api/login/route.js
import connectDb from "@/lib/dbConnection";
import { NextRequest,NextResponse } from "next/server";
import User from "../../../../models/user";

export async function POST(req : NextRequest) {
    try{


    const { email, password } = await req.json();

    //server slide validation 
    if(email.length <0 || password.length <6){
        return NextResponse.json({error :"Invalid Email or password "},{status : 401})
    }

 await connectDb();

 const userfind = await User.findOne({email})


 if(!userfind){
    return NextResponse.json({error :"Invalid Email or password"},{status : 400})
 }




      if (password == userfind.username) {
        return NextResponse.json({ message: "Valid User ID" }, { status: 200 });
      }
      else{
          // return NextResponse.json({error :"Invalid Email or password"},{status : 402})
          return NextResponse.json({ password, name: userfind.username });

      }
}
catch (err: any) {
  //  console.error("Login error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }

 
}
