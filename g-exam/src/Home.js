import './App.css';
import React from 'react';

//라우트 테스트

function MovePage()
{

}

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
              MovePage();
              }
            }
          >
            <a href={`/${btn.id}`}>{btn.title}</a>
          </button>
        </li>
      ))}
    </ul>
  );
}
function Main()
{
  return (
    <h1><a href='/'>G-PLAN</a></h1>
  )
}
function MyApp() 
{
  const btntype = [
    {id : "login", title : "로그인"}, 
    {id : "myinformation", title : "내정보"}
  ]
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <div className = "login_btn_space">
          <ControlBtn btntype = {btntype} onChangeMode = {(id)=>{
            console.log(id);
          }}></ControlBtn>
        </div>
      </div>
    </div>
  );
}

export default MyApp;


