import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "R8f!d$2gL@xQ7vZ9^Bc&Tn#MpW4uY$eJ"; // Ideally from env

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
    console.log(role)
  //paths managment 
 // const path = request.nextUrl.pathname

    //  console.log("Token received in middleware:", token);

  // If no token, allow access to login page (no redirect)
  if (!token) {
    return NextResponse.next();
  }else{
    if(role == "Admin"){
        return NextResponse.redirect(new URL('/admin', request.url))
    }else{
        return NextResponse.redirect(new URL('/home', request.url))
    }
    
  }

   
}

export const config = {
  matcher: ["/login"],
};
