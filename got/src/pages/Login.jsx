import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectPassword, setEmail, setPassword } from "../../src/Redux/features/auth/AuthSlice";
import authServices from "../service/authServices";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector(selectEmail)
  const password = useSelector(selectPassword);
  
  const [error, setError] = useState(null);

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authServices.log({ email, password });
      if (response.status === 200) {
        alert(response.data.message);
  
        // Extract user role from response
        const userRole  = response.data.user?.role; 
  
        // Clear input fields
        dispatch(setEmail(""));
        dispatch(setPassword(""));
  
        // Navigate based on user role
        if (userRole  === "admin") {
          navigate('/AdminDashboardWrapper');
        } else {
          navigate('/UserDashboard/home');
        }
        
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <div className="relative">
          {/* Outer Mobile */}
          <div className="w-72 h-auto">
            <img
              src="image/2.webp"
              alt="Mobile 1"
              className="rounded-lg border border-purple-400"
            />
          </div>
          {/* Inner Mobile */}
          <div className="py-10 w-72 h-auto">
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
        <h1 className="text-3xl font-creep text-fuchsia-500 mb-4">GAME OF THREAD</h1>
        <form onSubmit={handlelogin} className="w-full max-w-xs space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" type="submit">
            Log in
          </button>
          <Link
            to="/Resetpassword"
            className="text-sm text-blue-500 hover:underline block text-center"
          >
            Forgot password?
          </Link>
        </form>

        <div className="mt-6 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-500 font-bold hover:underline" to="/Register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
