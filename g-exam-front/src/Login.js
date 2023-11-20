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

  async function handleLogin(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id, pw }),
    })
    .then((response) => {
      if (response.ok) {
        // 로그인 성공
        window.location.href = '/';
      } else {
        // 로그인 실패
        response.json().then((data) => {
          alert(data.error); // Passport에서 전달한 메시지 출력
        });
      }
    })
    .catch((error) => {
      console.error('로그인 오류:', error);
    });
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
