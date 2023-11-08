import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function LoginControl()
{
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
      });
  }, [isLoggedIn]);

  const handleLogout = () => {
    fetch('/logout', {
      method:'POST', 
      credentials:'include',
    })
      .then(response => response.json())
      .then(data => {
        if(data.success)
        {
          setIsLoggedIn(false);
          navigate('/');
        }
        else
        {
          console.error("로그아웃 실패");
        }
      })
      .catch(error => {
        console.error('로그아웃 요청중 오류발생 : ', error);
      });
  };

  return(
    <ul>
      <button id = 'login' className="login_btn" onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
        {isLoggedIn ? "로그아웃" : "로그인"}</button>
      <button id = 'myinformation' className="login_btn"><Link to ='/myinformation'>내정보</Link></button>  
    </ul>
  );
}
//임시 함수
function TestBtn(props)
{
  return (
    <ul>
      {props.btntype.map((btn, index) => (
        <li key={index}>
          <button className="test_btn"
            onClick={() => 
              {
              props.onChangeMode(btn.id);
              }
            }
          >
            <Link to ={`/${btn.id}`}>{btn.title}</Link>
          </button>
        </li>
      ))}
    </ul>
  );
}
function MyApp() 
{
  const exambtntype = [
    {id : "prevtest", title : "기출문제 풀기"}, 
    {id : "wordtest", title : "영단어 시험 보기"}, 
    {id : "record", title : "시험결과 보기"}
  ];
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <div className = "login_btn_space">
          <LoginControl/>
        </div>
        <div className='btnsection'>
          <TestBtn btntype = {exambtntype} onChangeMode = {(id)=>{

          }}></TestBtn>
        </div>
      </div>
    </div>
  );
}

export default MyApp;


