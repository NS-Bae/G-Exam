import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

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
            <Link to ={`/prevtest/${btn.id}`}>{btn.title}</Link>
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
    {id : "science", title : "과학 기출문제"}
  ]
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <h2>기출문제 풀기</h2>
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


