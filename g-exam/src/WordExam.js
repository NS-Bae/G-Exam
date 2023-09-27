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
            <Link to ={`/wordtest/${btn.id}`}>{btn.title}</Link>
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
  const wordtype = [
    {id : "element", title : "초등 영단어"}, 
    {id : "middle", title : "중등 영단어"}, 
    {id : "high", title : "고등 영단어"}, 
    {id : "toeic", title : "토익 영단어"}
  ]
    return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <h2>영단어 시험</h2><div className='btnsection'>
          <TestBtn btntype = {wordtype} onChangeMode = {(id)=>{
            console.log(id);
          }}></TestBtn>
        </div>
      </div>
    </div>
  );
}

export default MyApp;


