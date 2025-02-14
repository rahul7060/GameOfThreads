import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from "../../src/Redux/features/auth/AuthSlice";
import authServices from "../service/authServices";


const Register = () => {
const dispatch =useDispatch();
const navigate = useNavigate();
const name =useSelector(selectName);
const email = useSelector(selectEmail);
const password =useSelector(selectPassword)

const handleregister = async (e)=>{
e.preventDefault();
try {
  const response = await authServices.reg({name, email ,password});
  if(response.status===201){
    alert(response.data.message);
  }
    
    dispatch (setName ("")) ;
    dispatch(setEmail(""));
    dispatch (setPassword (""));
  
  setTimeout(()=>{
navigate('/Login')
  },500)
} catch (error) {
  alert(error.message);
}

}

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <div className="relative">
          {/* Outer Mobile */}
          <div className=" py-10 w-72 h-auto">
            <img
          src="image/2.webp"
              alt="Mobile 1"
              className="rounded-lg border border-purple-400"
            />
          </div>
          {/* Inner Mobile */}
          <div className=" space-y-12 w-72 h-auto">
            <img
              src="image/1.png"
              alt="Mobile 2"
              className="rounded-lg border border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-white">
        {/* Instagram Title */}
        <h1 className="text-3xl font-creep text-fuchsia-500 mb-4">COFFLOGG</h1>

        {/* Sign Up Header */}
        <p className="text-center text-gray-600 mb-6">
          <strong>Sign up to see blogg , photos and videos from your friends.</strong>
        </p>

        {/* Sign Up Form */}
        <form onSubmit={handleregister} className="w-full max-w-xs space-y-4">
          <input
            type="text"
            placeholder="name "
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e)=>dispatch(setName(e.target.value))}
          />
            <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e)=>dispatch(setEmail(e.target.value))}
          />
          

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e)=>dispatch(setPassword(e.target.value))}
          />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign Up
          </button  >
        </form>

      

        <p className="text-xs text-gray-500 mt-4 text-center">
          People who use our service may have uploaded your contact information to cofflogg.{" "}
          <a href="#" className="text-blue-500 underline">
            Learn More
          </a>
        </p>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms
          </a>
          ,{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="#" className="text-blue-500 underline">
            Cookies Policy
          </a>
          .
        </p>

        {/* Footer Section */}
        <div className="mt-6 text-sm">
          Have an account?{" "}
          <Link  to="/Login" className="text-blue-500 font-bold hover:underline">
            Log in
          </Link>
        </div>

       </div>
    </div>
  );
};

export default Register;