import React from 'react'
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail,  setEmail } from '../../src/Redux/features/auth/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../../src/service/authServices'


const Resetpassword = () => {
const dispatch = useDispatch();
const email = useSelector(selectEmail)
 const navigate = useNavigate();
 const handleforpass = async (e)=>{

e.preventDefault();
try {
const response = await authServices.forgot({email})
if(response.status===201){
  alert(response.message);
}
navigate('/Verifycode')
 
} catch (error) {
  alert(error.message);
}
};

  return (
    <div>
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-4">
   <p className='text-black font-creep text-5xl' >GAME OF THREAD</p>
        </div>
        <h2 className="text-center text-xl font-semibold mb-4">
          Trouble logging in?
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email and we'll send you a link to get back into your account.
        </p>
        <form onSubmit={handleforpass} >
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e)=>dispatch(setEmail(e.target.value))}
          />
          <button type="submit" className="w-full bg-black text-white p-2 rounded">
            Send login link
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-black">
            Can't reset your password?
          </a>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">|</span>
        </div>
        <div className="text-center mt-4">
          <Link to="/Register" className="text-black">
            Create new account
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link to='/Login' className="text-black">
            Back to login
          </Link>
        </div>
      </div>
    </div>
</div>
  )
}

export default Resetpassword;