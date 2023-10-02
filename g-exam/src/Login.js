import './App.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Main() {
  return (
    <h1><Link to='/'>G-PLAN</Link></h1>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!usernamePattern.test(username) || !passwordPattern.test(password)) 
    {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      return;
    }
    // 여기에서 로그인 데이터(username, password)를 서버로 전송하거나 원하는 동작을 수행합니다.
    console.log('로그인 시도:', username, password);
    alert('로그인 시도:'+ username + password);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="input_place">
        <label>아이디</label>
        <input
          id='id'
          type="text"
          value={username}
          placeholder='ID'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input_place">
        <label>비밀번호</label>
        <input
          id='pw'
          type="password"
          value={password}
          placeholder='PASSWORD'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className='test_btn' type="submit">로그인</button>
    </form>
  );
}

function MyApp() {
  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <div className="login_place">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default MyApp;

/* function MultiLabels(props)
{
  const {labels} = props;

  return(
    <div className='label_place'>
      {labels.map((label, index) => (
        <label key = {index}>{label}</label>
      ))}
    </div>
  );
}
function InputField({type})
{
  let id, name, ph;

  if(type === "id")
  {
    id = 'id';
    name = 'id';
    ph = 'ID';
  }
  else if(type === 'pw')
  {
    id = 'pw';
    name = 'pw';
    ph = 'PW';
  }
  return(
    <input id={id} name={name} placeholder={ph} />
  );
}

function MyApp() {
  const labelData = ['ID', 'PASSWORD'];

  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <div className='login_place'>
          <MultiLabels labels = {labelData}/>
          <div className='input_place'>
            <InputField type = "id" />
            <InputField type = "pw" />
          </div>
        </div>
      </div>
    </div>
  );
}
 */


