import './App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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

    fetch('/api/login', {
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
      <form action='/api/login' onSubmit={handleLogin}>
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
        <div className='place'>
          <button className='test_btn' type="submit" value="로그인">로그인</button>
        </div>
      </form>
    </AuthContent>
  );
}
function MyApp() {
  const navigate = useNavigate();

  const handleClickLabel = (e) => {
    const labelId = e.target.id;
    if(labelId === 'reset_pw')
    {
      alert('관리자 혹은 교사에게 문의 하세요.');
      navigate('/reset_pw');
    }
    else if(labelId === 'join_member')
    {
      navigate('/join_member');
    }
  }

  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <LoginForm />
        <div className="login_etc">
          <label id = 'reset_pw' onClick={handleClickLabel}>비밀번호 찾기</label>
          <label id = 'join_member' onClick={handleClickLabel}>회원가입</label>
        </div>
      </div>
    </div>
  );
}
export default MyApp;
