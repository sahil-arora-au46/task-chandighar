import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from "../store/authSlice"




function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    setError("")
    try {
      const response = await fetch('http://localhost:4909/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials:"include"
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error logging in');
      }

      dispatch(login({userData: responseData.user}))
     

      navigate("/home")
      
      

    } catch (err) {
      console.log('Error logging in:', err);
      setError(err.message); 
    }
  };

  return (
    <>
    
    <div className='flex justify-center flex-col text-center border border-black p-2 shadow-xl'>
      <h4>Login Form</h4>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 text-left">
      <div className="mb-4">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
        <input
          id="userName"
          type="text"
          {...register('userName', { required: 'User Name is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { 
            required: 'Password is required', 
            minLength: { value: 2, message: 'Password must be at least 6 characters long' } 
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} 
      

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
      <p className="mt-4">Not a user? <span to="#" className="text-blue-500"><Link to="/signup">Create a new account</Link></span></p>
    </form>
    </div>
     
    </>
  );
}

export default Login;
