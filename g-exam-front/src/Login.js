import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// AuthContent 컴포넌트 정의
function AuthContent({ title, children }) {
  return (
    <div className="auth_container">
      {children}
    </div>
  );
}
function Main() {
  return (
    <h1><Link to='/'>G-PLAN</Link></h1>
  );
}

function LoginForm(props) {
  const [id, setId] = useState('');
  const [pw, setPW] = useState('');

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  async function handleLogin(e) {
    e.preventDefault();
    if (!usernamePattern.test(id) || !passwordPattern.test(pw)) {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      return;
    }
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
      });
  
      if (response.ok) 
      {
        const data = await response.json();
        console.log(data);
        window.location.href = '/';
      } 
      else 
      {
        console.error('로그인 실패:', response.status);
      }
    } 
    catch (error) 
    {
      console.error('로그인 오류:', error);
    }
  }

  return (
    <AuthContent title="로그인"> 
      <form action='/login' onSubmit={handleLogin}>
        <div className="input_place">
          <label>ID</label>
          <input
              id='id'
              name='id'
              type="text"
              value={id}
              placeholder='ID'
              onChange={(e) => setId(e.target.value)}
              required
            />
        </div>
        <div className="input_place">
          <label>PASSWORD</label>
          <input
            id='pw'
            name='pw'
            type="password"
            value={pw}
            placeholder='PASSWORD'
            onChange={(e) => setPW(e.target.value)}
            required
          />
        </div>
        <button className='test_btn' type="submit" value="로그인">로그인</button>
      </form>
    </AuthContent>
  );
}

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
        <LoginForm />
        <div className="login_etc">
          <AutoLoginCheck />
          <ControlMemberLabel labels = {labelData}/>
        </div>
      </div>
    </div>
  );
}
export default MyApp;
