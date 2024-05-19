import { useState } from 'react';
// import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskForm from './components/TaskForm';
import Home from "./pages/Home";
import Edit from "./components/Edit"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/edit-task" element={<Edit />} />
      </Routes>
    </Router>
   
  )
}

export default App
