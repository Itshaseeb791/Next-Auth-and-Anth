import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";

 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type")
    const token = searchParams.get("token");
    
    console.log({typee:type,tokene:token})

    if (!token) {
      return NextResponse.json({ message: "Token is missing" }, { status: 400 });
    }
    if(type == "verify"){
      
      const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 404 });
    }

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.isVerfied = true;

    const savedUser = await user.save();

    if (!savedUser) {
      return NextResponse.json({ message: "Failed to verify. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });

    
    }
    else{
      const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 404 });
    }

    user.forgotPasswordToken =  undefined,
    user.forgotPasswordTokenExpiry= undefined,
    user.forgotPasswordTokenStatus= "Verfied,"
    

    const savedUser = await user.save();

    if (!savedUser) {
      return NextResponse.json({ message: "Failed to verify. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
    }
   
  } catch (error: any) {
    console.log("Error verifying email:", error.message);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
