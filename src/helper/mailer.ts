const nodemailer = require("nodemailer");
import bcrypt from "bcryptjs";
import User from "../../models/user";
import { NextResponse } from "next/server";

const mailer = async ({email,emailType,userID}
    :any
)=>{

 try{

   //creating hash 
          const token = await bcrypt.hash(userID.toString(),10)
          const user = await User.findById(userID)

          if(!user){
            return NextResponse.json({message : "user not found"},{status:404})
          }

          if(emailType == 'Verfiy'){

          
              const response = await User.findByIdAndUpdate(userID,
                  {verifyToken : token,
              verifyTokenExpiry : Date.now() + 3600000}
              )

          }
          else if(emailType == 'Forget'){
              const response = await User.findByIdAndUpdate(userID,
                { forgotPasswordToken : token,
            forgotPasswordTokenExpiry : Date.now() + 3600000}
              )
          }else{
            return NextResponse.json({message : "email type is undefined"},{status:400})
          }

          
          

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "685eeec6540aaa",
            pass: "41dbc09e4e6f6d"
          }
        });
        
        

        //this is reposble for sending mail

            const info = await transport.sendMail({
            from: 'webcourse@gmail.com',
            to: email,
            subject: emailType === 'Verfiy' ? "Pleae Verfiy email" : "Forgetten Password",
            html: `<p>Click here to verfiy link automatically  <a href="http://localhost:3000/verifyemail?token=${token}">here</a> to ${emailType === "Verfiy" ? "verify your email" : "reset your password"}
                    or copy and paste the link below in your browser. <br> http://localhost:3000/verifyemail?token=${token}`
          });
          return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

            console.log("Message sent:", info?.messageId || "No message ID");


 }catch(error : any){

              console.log("Error in mailer:", error);
           
                return NextResponse.json({message : "unexpected error happened",err: error},{status : 404})
 }
  
}

export default mailer;