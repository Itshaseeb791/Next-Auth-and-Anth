import CardsSec from "@/components/CardsSec";
import Hero from "@/components/Hero";
import { div } from "motion/react-client";
import Image from "next/image";

export default function Home() {
  
  return (
  <div>
    <Hero/>
    <CardsSec/>
  </div>
       // <h1 className="mt-8 ts-3xl">hello haseeb in next Js jounry</h1>
  );
}
