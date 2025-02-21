import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectPassword, setEmail, setPassword } from "../../src/Redux/features/auth/AuthSlice";
import authServices from "../service/authServices";

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
        alert(response.data.message);
  
        const userRole = response.data.user?.role; 
  
        dispatch(setEmail(""));
        dispatch(setPassword(""));
  
        if (userRole === "admin") {
          navigate('/AdminDashboardWrapper');
        } else {
          navigate('/UserDashboard');
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
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
              className="block w-full mt-2 rounded-md bg-white px-3 py-2 text-gray-900   outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="block w-full mt-2 rounded-md bg-white px-3 py-2 text-gray-900  outline-gray-950 placeholder-gray-400  focus:outline-indigo-600"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-white font-semibold hover:bg-indigo-500 focus:outline  focus:outline-indigo-600"
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          <Link to="/Resetpassword" className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </Link>
        </p>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member? 
          <Link to="/Register" className="text-indigo-600 font-semibold hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
