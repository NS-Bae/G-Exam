import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

function TestBtn(props, isLoggedIn)
{
  const navigate = useNavigate();
  return (
    <ul>
      {props.btntype.map((btn, index) => (
        <li key={index}>
          <button className="test_btn"
            onClick={() => 
              {
                if (isLoggedIn) 
                {
                  props.onChangeMode(btn.id);
                  navigate(`/workbookexam/${btn.id}`);
                } 
                else 
                {
                  alert('로그인이 필요합니다.');
                }
              }
            }
          >
            {btn.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MyApp() {
  const exambtntype = [
    {id : "korean", title : "국어 기출문제"}, 
    {id : "english", title : "영어 기출문제"}, 
    {id : "math", title : "수학 기출문제"}, 
    {id : "social", title : "사회 기출문제"}, 
    {id : "science", title : "과학 기출문제"}, 
    {id : "etc", title : "기타 기출문제"}
  ]
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
        <div className='btnsection'>
          <TestBtn btntype = {exambtntype} onChangeMode = {(id)=>{
            console.log(id);
          }}></TestBtn>
        </div>
      </div>
    </div>
  );
}

export default MyApp;


