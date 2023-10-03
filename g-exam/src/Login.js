import './App.css';
import React, { useState, useEffect } from 'react';
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
//자동로그인
function AutoLoginCheck()
{
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem('autologin', isChecked.toString());
  }, [isChecked]);

  const checkboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const storedAutoLogin = localStorage.getItem('autoLogin');
    if (storedAutoLogin === 'true') {
      setIsChecked(true);
      // 여기에서 자동 로그인 처리를 수행하면 됩니다.
      console.log('자동 로그인이 활성화되었습니다.');
    }
  }, []);
  return (
    <div>
      <span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={checkboxChange}
          style={{ textDecoration: 'none' }} 
        />
        자동 로그인
      </span>
    </div>
  );
}
function ControlMemberLabel(props)
{
  const {labels} = props;
  

  return(
    labels.map((item, index) => (
      <Link to = {`/${item.id}`} key = {index}>
        <label>{item.label}</label>
      </Link>
    ))
  );
}

function MyApp() {
  const labelData = [
    {id : "reset_pw", label : '비밀번호 찾기'}, 
    {id : "join_member", label : '회원가입'}
  ];

  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <div className="input_place">
          <LoginForm />
        </div>
        <div class="login_etc">
          <AutoLoginCheck />
          <ControlMemberLabel labels = {labelData}/>
        </div>
      </div>
    </div>
  );
}
export default MyApp;