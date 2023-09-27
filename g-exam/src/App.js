import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Myinfo from "./Myinfo";
import Login from "./Login";


const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/myinformation" element = {<Myinfo />} />
      <Route path = "/login" element = {<Login />} />
    </Routes>
  );
};

export default App;

