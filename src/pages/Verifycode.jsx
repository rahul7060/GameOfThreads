import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectResetCode, setResetCode } from  '../../src/Redux/features/auth/AuthSlice'
import authServices from '../service/authServices';




const Verifycode = () => {
const navigate= useNavigate();
const resetCode = useSelector(selectResetCode);
const dispatch = useDispatch();

const handlecode = async (e) => {
  e.preventDefault();
  try {
    const response = await authServices.code({ resetCode });
    if (response.status === 201) {
      alert(response.data.message);
      
    }
    navigate('/Changepassword');
  } catch (error) {
    alert(error.message);
  }
};



  return (
    <div>
<body class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-semibold text-gray-800 mb-4">Enter Verification Code</h1>
    <p class="text-gray-600 mb-4">
      For your security, we have sent the code to your email ***-***-**@mail.com.
    </p>
    <form onSubmit={handlecode} >
      <label for="verificationCode" class="block text-sm font-medium text-gray-700">Verification Code</label>
      <input
        type="Number"
        id="resetCode"
        name="resetCode"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter your code"

        value={resetCode}
        onChange={(e)=>dispatch(setResetCode(e.target.value))}
      />
      <div class="mt-4 flex justify-between items-center">
        <button
          type="button"
          class="text-black hover:underline text-sm"
        >
          Resend code
        </button>
        <button
          type="submit"
          class="bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          
        >
          Submit code
        </button>
      </div>
    </form>
    <div class="mt-6">
      <a href="#" class="text-sm text-gray-600 hover:underline">Need help?</a>
      <p class="text-sm text-gray-500 mt-1">
        If you cannot receive the code or if you changed your email or phone number, try a different way.
      </p>
    </div>
  </div>
</body>

    </div>
  )
}

export default Verifycode;
