import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectPassword, setEmail, setPassword } from "../../src/Redux/features/auth/AuthSlice";
import authServices from "../service/authServices";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  
  const [error, setError] = useState(null);

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authServices.log({ email, password });
  
      if (response.status === 200) {
        const userRole = response.data.user?.role; 
  
        Swal.fire({
          toast: true,
          position: "top-right",
          icon: "warning",
          title: "login successfull",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
     
        dispatch(setEmail(""));
        dispatch(setPassword(""));
  
        setTimeout(() => {
          if (userRole === "admin") {
            navigate('/AdminDashboardWrapper');
          } else {
            navigate('/UserDashboard');
          }
        }, 1000); // Navigate after showing the alert
      } else {
        Swal.fire({
          title: "Login Failed",
          text: "Please check your credentials.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-14 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl text-center font-creep ">GAME OF THREAD</h1>
        <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlelogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="block w-full mt-2 rounded-md bg-white px-3 py-2 text-gray-900   outline-black placeholder-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 outline-black placeholder-gray-400 focus:outline-2 focus:outline-black  ">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="block w-full mt-2 rounded-md bg-white px-3 py-2 text-gray-900  outline-black placeholder-black  focus:outline-black"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-black px-3 py-2 text-white font-semibold hover:bg-green-600 focus:outline  focus:outline-black"
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          <Link to="/Resetpassword" className="text-black hover:text-indigo-500">
            Forgot password?
          </Link>
        </p>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member? 
          <Link to="/Register" className="text-black0 font-semibold hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
