import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

function ControlBtn(props)
{
  return (
    <ul>
      {props.btntype.map((btn, index) => (
        <li key={index}>
          <button className="login_btn"
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
function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MyApp() 
{
  const btntype = [
    {id : "login", title : "로그인"}, 
    {id : "myinformation", title : "내정보"}
  ]
  const exambtntype = [
    {id : "prevtest", title : "기출문제 풀기"}, 
    {id : "wordtest", title : "영단어 시험 보기"}, 
    {id : "record", title : "시험결과 보기"}
  ]
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <div className = "login_btn_space">
          <ControlBtn btntype = {btntype} onChangeMode = {(id)=>{
/*             console.log(id);
 */          }}></ControlBtn>
        </div>
        <div className='btnsection'>
          <TestBtn btntype = {exambtntype} onChangeMode = {(id)=>{
/*             console.log(id);
 */          }}></TestBtn>
        </div>
      </div>
    </div>
  );
}

export default MyApp;


