import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation  } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}

function MyApp() 
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examDetails = JSON.parse(decodeURIComponent(searchParams.get('examDetails')));
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  console.log(examDetails);

  useEffect(()=> {
    fetch('/checksession')
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) 
        {
          setIsLoggedIn(true);
        }
        else
        {
          navigate('/');
          alert('로그인이 필요합니다.');
        }
      });
  }, [isLoggedIn, navigate]);
  
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <p>국어단어시험</p>
        <div>
          <p>시험 종류: {examDetails.examType}</p>
          <p>과목: {examDetails.subject}</p>
          <p>문항 수: {examDetails.questionCount}</p>
          <p>랜덤 출제 여부: {examDetails.selectedTag}</p>
          {/* 시험 화면 구성 및 시험 진행 */}
        </div>
      </div>
    </div>
  );
}

export default MyApp;


