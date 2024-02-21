import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function RenderQuestion({examDetails})
{
  const [result, setResult] = useState([]);
  console.log("시험정보", examDetails);
  const fetchExam = () =>{
    fetch('/start_exam', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examDetails,
      }),
    })
    .then((response) => {
      if(!response.ok)
      {
        throw new Error('네트워크의 응답이 좋지 않습니다.');
      }
      return response.json();
    })
    .then((data) => {
      setResult(data.data);
      console.log(data.data);
    })
    .catch((error) => {
      console.log('데이터를 불러오는 과정에서 문제가 발생했습니다.', error)
    })
  }
  useEffect(() => {
    fetchExam();
  }, []);
}
function ImgPlace()
{

}
function ParagraphPlace()
{

}
function ChoiceExamForm()
{
  return (
    <div className='place'>
    </div>
  );
}
function EssayExamForm()
{
  return (
    <div className='place'>
      
    </div>
  );
}
function MyApp() 
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examDetails = JSON.parse(decodeURIComponent(searchParams.get('examDetails')));
  const examType = examDetails.examType;
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    fetch('/checksession')
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) 
        {
          setIsLoggedIn(true);
        }
        else
        {/* 
          navigate('/'); */
          alert('로그인이 필요합니다.');
        }
      });
  }, [isLoggedIn, navigate]);
  console.log(examDetails);
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <h2> 국어 일반문제 풀기</h2>
        <RenderQuestion examDetails = {examDetails}/>
      </div>
    </div>
  );
}

export default MyApp;


