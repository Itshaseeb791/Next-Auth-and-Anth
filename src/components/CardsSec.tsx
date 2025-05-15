import { link } from "fs";
import { HoverEffect } from "./ui/card-hover-effect";

export default function CardsSec(){
     return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={courses}/>
    </div>
  );
}
export const  courses = [
  {
    name: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson", 
    description: "Covers basic programming concepts using languages like Python and C++.",
    link :"https://www.youtube.com/watch?v=AWliApDc61w"
  },
  {
    name: "Data Structures and Algorithms",
    instructor: "Prof. Ahmed Khan", 
    description: "Focuses on data organization techniques, algorithm design, and problem-solving.",
     link :"https://www.youtube.com/watch?v=VTLCoHnyACE&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
  },
  {
    name: "Database Systems",
    instructor: "Ms. Maria Lee", 
    description: "Teaches relational database design, SQL, and normalization principles.",
     link :"www.googlee.com"
  },
  {
    name: "Operating Systems",
    instructor: "Dr. Robert Brown", 
    description: "Explores process management, memory allocation, and system-level programming.",
     link :"www.googlea.com"
  },
  {
    name: "Web Development",
    instructor: "Mr. Alex Green", 
    description: "Introduces front-end and back-end web technologies including HTML, CSS, JavaScript, and basic server-side scripting.",
     link :"www.googles.com"
  }
];