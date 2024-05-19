import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userName= useSelector((state) => state.auth.userData.userName);
  const navigate = useNavigate();

  const handleAddTaskClick = () => {
    navigate('/add-task'); 
  };

  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">
        <h3>Hello!! </h3>{userName}
      </div>
      <button
        onClick={handleAddTaskClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>
    </nav>
  );
};

export default Navbar;
