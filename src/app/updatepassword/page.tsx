"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useState,useEffect } from "react"

 const UpdatePasswordPage =()=>{
    const router = useRouter()
    const [visible,Setvisible]= useState(false);
    const [errorstate ,setError] = useState("")
    const [updatedpassword,Setupdatedpassword]= useState(
     { email:"",
      password:"",
      confirmpassword:""}
    )
     

    // useEffect(
      
    //   const timer = setTimeout(
    //      async()=>{
    //     const res = await axios.post('/api/verifyemail')
    //     if(res.status==200){
    //       Setvisible(true)
    //     }}
    //   , 3000);
    //   return   clearTimeout(timer)
    //   ,[]
    //  );

    useEffect(() => {
  const timer = setTimeout(async () => {
    try {
      const res = await axios.get('/api/verifyemail',);
      if (res.status === 200) {
        Setvisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, 3000);
    return () => clearTimeout(timer);
}, []);

useEffect(()=>{
  if(errorstate){
    const timer =setTimeout(() => {
      setError("")
    }, 2000);
  
  return () => clearTimeout(timer);
  }
},[errorstate])



        const validate = ()=>{
      //  const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
        if(!passwordRegex.test(updatedpassword.confirmpassword)){
          setError("Password must contain lowercase, uppercase, symbol, and be at least 6 characters")
            return false
        }
        else if(!emailRegex.test(updatedpassword.email)){
            setError("please Add a proper Email pettern like someone@gmail.com")
            return false
        }else if(updatedpassword.password != updatedpassword.confirmpassword){
            setError("Passwords do not match");
            return false
        }

        return true;
    }

    const onSubmit = async()=>{
        if(validate()){
        try{
            const request = await axios.post('/api/updatepassword',updatedpassword )
          if(request.status == 200){
            router.push('/dashbord')
          }else{
            console.log("any exception has been appear please try again" + request.data.message)
            return
          }
        }catch(err:any){
           if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
        }
        }
    }


    return(
     <div>
        {visible ? 
           <div>
            <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
         {errorstate && <p className="text-red-600">{errorstate}</p>}

          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action={onSubmit}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"value={updatedpassword.email} onChange={(e)=>Setupdatedpassword({...updatedpassword,email:e.target.value})} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" value={updatedpassword.password} onChange={(e)=>Setupdatedpassword ({...updatedpassword,password:e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="confirm-password" value={updatedpassword.confirmpassword} onChange={(e)=>Setupdatedpassword ({...updatedpassword,confirmpassword:e.target.value})} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
        </div> :
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
     
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Please login into your mail and verify the email which has been sent to your account.
        </p>
      </div>
    </div>
            }
     </div>
    )
 }

export default UpdatePasswordPage 
