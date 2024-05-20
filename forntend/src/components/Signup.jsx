import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:4909/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error signing up');
      }

      setSuccess("Signup successful!");
      setError("");
      navigate("/login");

    } catch (err) {
      console.log('Error signing up:', err);
      setError(err.message);
      setSuccess("");
      
    }
  };

  return (
   <div className='text-center border border-black p-2 shadow-xl'>
    <h3>Signup </h3>
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
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', { required: 'Full Name is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
    </form>
   </div>
  );
}

export default Signup;
