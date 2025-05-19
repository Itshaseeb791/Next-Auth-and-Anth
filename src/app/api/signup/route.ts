import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/dbConnection";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";

export async function POST(request :NextRequest) {
    //getting values from request function
    try{

   
    const {username,email,password} =  await request.json();

    //validation 
    if(username.length ==0 && email.length == 0 && password.length ==0){
        return NextResponse.json({err:"please fill all the fields"},{status : 400})
    }else if(password.length < 6){
         return NextResponse.json({err:"Password must be 6 char"},{status : 400})
    }else{
        await connectDb();
        let finduser =  await User.findOne({email})
        if(!finduser){
            let passhash = await bcrypt.hash(password,10)
            let newUser = new User({
                username,
                email,
                password : passhash,
                role : "Admin"
                
            })
            let result = await newUser.save();
            if(!result){
                return NextResponse.json({err:"Operation Unsuccessful ",result},{status : 400})
            }else{
                return NextResponse.json({err :"User has be added Sucessfully",result},{status : 201})
            }
        }else{
             return NextResponse.json({err:"Email already Exist"},{status : 400})
        }
    }
        


    }catch(err){
        return NextResponse.json({err:"Internal Server Error",status : 500})
    }
    
}