import { useState } from 'react';
// import './App.css';
import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignupPage';
import TaskForm from './components/TaskForm';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<TaskForm />} />
      </Routes>
    </Router>
   
  )
}

export default App