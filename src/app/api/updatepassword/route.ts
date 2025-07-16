import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";


export async function POST(request : NextRequest) {
    const {email,password,confirmpassword} = await request.json()

    if(validate(email,password,confirmpassword)){
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message : "No user found against this username"},{status:401})
        }

        if(!user.isVerfied){
            return NextResponse.json({message:"User don't have verfied email during sign up "},{status:401})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const res = await User.findByIdAndUpdate(user._id,{password:hashpassword,
            forgotPasswordTokenStatus:"true"}
            
        )
        if(!res){
            return NextResponse.json({message:"Can't update password please try again"},{status:401})
        }else{
            return NextResponse.json({message : "Password has been updated Successfully"})
        }



    }

    
}

//this function is using for server side rendering 
   const validate = (email : string,pass : string ,confirmpass : string)=>{
     
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
        if(!passwordRegex.test(pass)){
          NextResponse.json({message :"Password must contain lowercase, uppercase, symbol, and be at least 6 characters" },{status : 400})
            return false
        }
        else if(!emailRegex.test(email)){
             NextResponse.json({message : "please Add a proper Email pettern like someone@gmail.com"},{status : 400})
            return false
        }else if(pass != confirmpass){
            NextResponse.json({message : "Password must contain lowercase, uppercase, symbol, and be at least 6 characters"},{status:400})
            return false
        }

        return true;
    }