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
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('/myinformation')
      .then(response => response.json())
      .then(data => {
        setUserData(data); // 서버에서 받은 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('데이터 가져오기 중 오류 발생:', error);
      });
  }, []);

  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <h2>User Information</h2>
        <ul>
          {userData.map(user => (
            <li key={user.id}>
              ID: {user.id}, Name: {user.name}, School: {user.school}, Grade: {user.grade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyInformation;