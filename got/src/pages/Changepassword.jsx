import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNewPassword, selectConfirmPassword, setNewPassword, setConfirmPassword } from '../../src/Redux/features/auth/AuthSlice';
import authServices from '../service/authServices';



const  Changepassword = () => {
const navigate=useNavigate();
const dispatch = useDispatch();
const newPassword= useSelector(selectNewPassword)
const confirmPassword =useSelector(selectConfirmPassword)

const resetpass = async (e)=>{
  e.preventDefault();
try {
  const response = await authServices.changepass({newPassword,confirmPassword})

  if (response.status === 201) {
    alert(response.message);
    
  }
  navigate('/Login');
} catch (error) {
  alert(error.message);
}

}



  return (
    <div>

<body class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-semibold text-gray-800 mb-4">Create New Password</h1>
    <p class="text-gray-600 mb-6">
      We'll ask for this password whenever you sign in.
    </p>
    <form onSubmit={resetpass}  >
  
      <label for="newPassword" class="block text-sm font-medium text-gray-700">ENTER EMAIL</label>
   
      
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter new password"
        required
        value={newPassword}
        onChange={(e)=>dispatch(setNewPassword(e.target.value))}

      />
      
  
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mt-4">Password again</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-indigo-500 sm:text-sm"
        placeholder="Re-enter new password"
        required
value={confirmPassword}
onChange={(e)=>dispatch(setConfirmPassword(e.target.value))}
      />

    
      <button
        type="submit"
        class="mt-6 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save changes and sign in
      </button>
    </form>
  </div>
</body>



    </div>
  )
}

export default Changepassword;