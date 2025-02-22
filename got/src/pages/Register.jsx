import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from "../../src/Redux/features/auth/AuthSlice";
import authServices from "../service/authServices";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const response = await authServices.reg({ name, email, password });
  
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
  
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));
  
        setTimeout(() => {
          navigate("/Login");
        }, 2000); // Redirect after SweetAlert
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl text-center font-creep ">GAME OF THREAD</h1>
        <p className="mt-3 text-center text-gray-600">
          <strong>Sign up to see blogs, photos, and videos from your friends.</strong>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleregister} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="block w-full px-3 py-2 rounded-md bg-white border border-gray-300 focus:outline-2 focus:outline-indigo-600"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full px-3 py-2 rounded-md bg-white border border-gray-300  focus:outline-indigo-600"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full px-3 py-2 rounded-md bg-white border border-gray-300  focus:outline-indigo-600"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button type="submit" className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-white font-semibold hover:bg-indigo-500  focus:outline-2 focus:outline-indigo-600">
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-xs  text-gray-500 text-center">
          People who use our service may have uploaded your contact information to Cofflogg. 
          <a href="#" className="text-indigo-600 underline">Learn More</a>
        </p>
        <p className="mt-4 text-xs text-gray-500 text-center">
          By signing up, you agree to our 
          <a href="#" className="text-indigo-600 underline">Terms</a>, 
          <a href="#" className="text-indigo-600 underline">Privacy Policy</a>, and 
          <a href="#" className="text-indigo-600 underline">Cookies Policy</a>.
        </p>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Have an account? 
          <Link to="/Login" className="text-indigo-600 font-semibold hover:text-indigo-500">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
