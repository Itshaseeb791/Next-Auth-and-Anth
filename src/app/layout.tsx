import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

 

export const metadata: Metadata = {
  title: "My App",
  description: "Learning how to make app in next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
     <Navbar/>
        {children}
      </body>
    </html>
  );
}
