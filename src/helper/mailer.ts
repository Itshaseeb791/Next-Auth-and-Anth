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
        let htmlContent = "";
        const frontendBaseUrl = "http://localhost:3000";

        if (emailType === 'Verfiy') {
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #333;">Email Verification</h2>
              <p>Hello,</p>
              <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${frontendBaseUrl}/api/verifyemail?type=verify&token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
              </p>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p><a href="${frontendBaseUrl}/api/verifyemail?type=verify&token=${token}">${frontendBaseUrl}/api/verifyemail?token=${token}</a></p>
              <p>Best regards,<br/>The WebCourse Team</p>
            </div>`;
        } else {
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #333;">Reset Your Password</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to proceed:</p>
              <p style="text-align: center;">
                <a href="${frontendBaseUrl}/api/verifyemail?type=update&token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #d9534f; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
              </p>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p><a href="${frontendBaseUrl}/api/verifyemail?type=update&token=${token}">${frontendBaseUrl}/api/updatepassword?token=${token}</a></p>
              <p>If you did not request this, please ignore this email.</p>
              <p>Best regards,<br/>The WebCourse Team</p>
            </div>`;
        }

        const info = await transport.sendMail({
          from: 'webcourse@gmail.com',
          to: email,
          subject: emailType === 'Verfiy' ? "Please Verify Your Email" : "Reset Your Password",
          html: htmlContent
        });

          return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

          //  console.log("Message sent:", info?.messageId || "No message ID");


 }catch(error : any){

              console.log("Error in mailer:", error);
           
                return NextResponse.json({message : "unexpected error happened",err: error},{status : 404})
 }
  
}

export default mailer;