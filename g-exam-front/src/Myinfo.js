import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MyInformation() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // `/profile` 엔드포인트로 GET 요청을 보내 세션 정보를 가져옵니다.
    fetch('/profile')
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP 오류 ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error('세션 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <h2>User Information</h2>
        {user ? (
        <div>
          <p>사용자 이름: {user.id}</p>
          {/* 다른 사용자 정보를 여기에 추가하세요 */}
        </div>
      ) : (
        <p>로그인되지 않았습니다.</p>
      )}
      </div>
    </div>
  );
}

export default MyInformation;
