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
                  navigate(`/wordtest/${btn.id}`);
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
    {id : "korean", title : "국어 단어시험"}, 
    {id : "english", title : "영어 단어시험"}, 
    {id : "chinesecharacter", title : "한문 단어시험"}, 
    {id : "history", title : "역사 단어시험"}, 
    {id : "science", title : "과학 단어시험"}, 
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


