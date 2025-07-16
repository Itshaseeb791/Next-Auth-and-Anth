'use client'
import { div } from "motion/react-client"
import React,{useState,useEffect} from "react"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signup(){
    const router = useRouter();
    //state for managing user info
    const [user,setuser] = useState({
        username:"",
        email:"",
        password:""
    })

   // state for managing error
    const [errorState,setError] = useState("")
    //state use for manging the enable or disbale signup buttons
    const [loading,setloading] = useState(false)

    //use effect of auto deleting error after a specfic timer
    useEffect(()=>{
        if(errorState){
        const timer = setTimeout(() => {
        setError("");
      }, 2000);
         return () => clearTimeout(timer); 

        }
    },[errorState])
    

    const validate = ()=>{
        const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
        if (!nameRegex.test(user.username)  ) {
           setError("Please use only letters in the username")
            return false;
        }
        else if(!emailRegex.test(user.email)){
            setError("please Add a proper Email pettern like someone@gmail.com")
            return false
        }else if(!passwordRegex.test(user.password)){
            setError("Password must contain lowercase, uppercase, symbol, and be at least 6 characters")
            return false
        }
        return true;
    }
    const handle = async (e : React.FormEvent) => {
      try{
        e.preventDefault();
        if(validate()){
           setloading(true)
           setError("")
        const response =  await axios.post("/api/signup",user)
        if (response.status === 201) {
      console.log("Signup Success ", response.data);
    //  alert("Signup successful!");
        router.push("/home");
      // You can display a success message to user here
    } else {
      console.warn("Unexpected response ❗", response.data);
      setloading(false)
    }
         
        }
      }catch(error){
             if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data);
       setloading(false)
    } else {
      console.error("Unexpected Error:", error);
       setloading(false)
    }
        }
 
    }
return (
    <section className="bg-gray-50 dark:bg-gray-900  py-10">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              {errorState && (
                <p>Error :  {errorState}</p>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handle}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  />
                  </div>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                      <input type="username" value={user.username} onChange={(e)=>setuser({...user,username:e.target.value})} name="username" id="username" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
               <button
  type="submit"
  disabled={loading}
  className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${
    loading
      ? "bg-primary-800 dark:bg-primary-900 cursor-not-allowed"
      : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  }`}
>
  {loading ? "Processing..." : "Create an account"}
</button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
)
}