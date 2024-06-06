import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Myinfo from "./Myinfo";
import Login from "./Login";
import Record from "./Record";

import Prevexam from "./Prevexam";
import PrevKorean from "./Prevexam_Korean";
import PrevEnglish from "./Prevexam_English";
import PrevMath from "./Prevexam_Math";
import PrevSocial from "./Prevexam_Social";
import PrevScience from "./Prevexam_Science";
import PrevEtc from "./Prevexam_Etc";

import Workbookexam from "./WorkbookExam";
import WorkbookKorean from "./WorkbookExam_Korean";
import WorkbookEnglish from "./WorkbookExam_English";
import WorkbookMath from "./WorkbookExam_Math";
import WorkbookSocial from "./WorkbookExam_Social";
import WorkbookScience from "./WorkbookExam_Science";
import WorkbookEnglishListening from "./WorkbookExam_English_Listening";
import WorkbookRefinement from "./WorkbookExam_Refinement";
import WorkbookEtc from "./WorkbookExam_Etc";

import WordExam from "./WordExam";
import KoreanWord from "./WordExam_Korean";
import EnglishWord from "./WordExam_English";
import ChineseCharacterWord from "./WordExam_ChineseCharacter";
import HistoryWord from "./WordExam_History";
import ScienceWord from "./WordExam_Science";
import EtcWord from "./WordExam_Etc";

import ResetPw from "./ResetPw";
import JoinMember from "./Join_member.js";
import RegistChoice from "./Regist_Choice.js";
import Classification from "./Management_Classification.js"


const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/myinformation" element = {<Myinfo />} />
      <Route path = "/login" element = {<Login />} />
      <Route path = "/prevtest" element = {<Prevexam />} />
        <Route path = "/prevtest/korean" element = {<PrevKorean />} />
        <Route path = "/prevtest/english" element = {<PrevEnglish />} />
        <Route path = "/prevtest/math" element = {<PrevMath />} />
        <Route path = "/prevtest/science" element = {<PrevScience />} />
        <Route path = "/prevtest/social" element = {<PrevSocial />} />
        <Route path = "/prevtest/etc" element = {<PrevEtc />} />
      <Route path = "/workbookexam" element = {<Workbookexam />} />
        <Route path = "/workbookexam/korean" element = {<WorkbookKorean />} />
        <Route path = "/workbookexam/english" element = {<WorkbookEnglish />} />
        <Route path = "/workbookexam/math" element = {<WorkbookMath />} />
        <Route path = "/workbookexam/science" element = {<WorkbookScience />} />
        <Route path = "/workbookexam/social" element = {<WorkbookSocial />} />
        <Route path = "/workbookexam/english_listening" element = {<WorkbookEnglishListening />} />
        <Route path = "/workbookexam/refinement" element = {<WorkbookRefinement />} />
        <Route path = "/workbookexam/etc" element = {<WorkbookEtc />} />
      <Route path = "/wordtest" element = {<WordExam />} />
        <Route path = "/wordtest/korean" element = {<KoreanWord />} />
        <Route path = "/wordtest/english" element = {<EnglishWord />} />
        <Route path = "/wordtest/chinesecharacter" element = {<ChineseCharacterWord />} />
        <Route path = "/wordtest/science" element = {<ScienceWord />} />
        <Route path = "/wordtest/history" element = {<HistoryWord />} />
        <Route path = "/wordtest/etc" element = {<EtcWord />} />
      <Route path = "/record" element = {<Record />} />
      <Route path = "/reset_pw" element = {<ResetPw />} />
      <Route path = "/join_member" element = {<JoinMember />} />
      <Route path = "/regist_choice" element = {<RegistChoice />} />
      <Route path = "/Classification" element = {<Classification />} />
    </Routes>
  );
};

export default App;

