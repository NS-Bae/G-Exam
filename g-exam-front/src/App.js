import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Myinfo from "./Myinfo";
import Login from "./Login";
import Prevexam from "./Prevexam";
import WordExam from "./WordExam";
import Record from "./Record";
import Korean from "./Prevexam_Korean";
import English from "./Prevexam_English";
import Math from "./Prevexam_Math";
import Social from "./Prevexam_Social";
import Science from "./Prevexam_Science";
import ElementWord from "./WordExam_Element";
import MiddleWord from "./WordExam_Middle";
import HighWord from "./WordExam_High";
import TOEICWord from "./WordExam_TOEIC";
import ResetPw from "./ResetPw";
import JoinMember from "./Join_member.js";
import Regist from "./Regist.js";


const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/myinformation" element = {<Myinfo />} />
      <Route path = "/login" element = {<Login />} />
      <Route path = "/prevtest" element = {<Prevexam />} />
        <Route path = "/prevtest/korean" element = {<Korean />} />
        <Route path = "/prevtest/english" element = {<English />} />
        <Route path = "/prevtest/math" element = {<Math />} />
        <Route path = "/prevtest/science" element = {<Science />} />
        <Route path = "/prevtest/social" element = {<Social />} />
      <Route path = "/wordtest" element = {<WordExam />} />
        <Route path = "/wordtest/element" element = {<ElementWord />} />
        <Route path = "/wordtest/middle" element = {<MiddleWord />} />
        <Route path = "/wordtest/high" element = {<HighWord />} />
        <Route path = "/wordtest/toeic" element = {<TOEICWord />} />
      <Route path = "/record" element = {<Record />} />
      <Route path = "/reset_pw" element = {<ResetPw />} />
      <Route path = "/join_member" element = {<JoinMember />} />
      <Route path = "/Regist" element = {<Regist />} />
    </Routes>
  );
};

export default App;

