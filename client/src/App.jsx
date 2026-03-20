import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { api } from "./api/api";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path = "/register" element = {<Register />}/>
        <Route path = "/login" element={<Login />} />
        <Route path = "/dashboard" element ={<Dashboard />} />
        
      </Routes>
    </>
  );
}

export default App;
