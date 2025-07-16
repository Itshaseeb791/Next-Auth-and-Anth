import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import mailer from "@/helper/mailer";
import connectDb from "@/lib/dbConnection";

 

export  async function  POST (request:NextRequest)  {
    await connectDb()
    const {email} = await request.json()

    //check for validation
    if(!email){
        return NextResponse.json({message:"Empty Email"},{status:400})
    }

// check weither user exist

    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({message:"No user is found against this email"},{status:404})
    }
    console.log(user)
    const mialerRes = await mailer({email:user.email,emailType:"Forget",userID:user._id}) 
    console.log(mialerRes)
      if(mialerRes){
            console.log("Email sent successfully");
            return NextResponse.json({ message: "Reset link sent to your email" }, { status: 200 });
            }
            else{
                console.log("Email sent unsuccessfully");
                return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
            }
    
}