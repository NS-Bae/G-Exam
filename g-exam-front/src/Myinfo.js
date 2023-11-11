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
/* function InfoTable()
{

}
 */
function TeacherBtn()
{
  return(
    <div className="btn_section">
        <button className="exam_register" >
            학생정보 관리
        </button>
        <button className="exam_register">
            시험문제 관리
        </button>
        <button className="exam_register">
            영단어 관리
        </button>
    </div>
  );
}
function StudentBtn()
{
  return(
    <div className='btn_section'>
      <button className="exam_register">
        기출시험 결과보기
      </button>
      <button className="exam_register">
        영단어시험 결과보기
      </button>
    </div>
  )
}

function MyInformation() {
  const [user, setUser] = useState([]);

  useEffect(() => {
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

  if(user.user_type === "학생")
  {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <h2>나의 정보</h2>
          <div>
            <p>사용자 ID  : {user.id}</p>
            <p>사용자 분류: {user.user_type}</p>
            <p>사용자 이름: {user.name}</p>
            <p>사용자 학교: {user.school}</p>
            <p>사용자 학년: {user.grade}</p>
          </div>
          <StudentBtn/>
        </div>
      </div>
    );
  }
  else if(user.user_type === "선생")
  {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <h2>나의 정보</h2>
          <div>
            <p>사용자 ID  : {user.id}</p>
            <p>사용자 분류: {user.user_type}</p>
            <p>사용자 이름: {user.name}</p>
            <p>강의 과목: {user.major}</p>
          </div>
          <TeacherBtn/>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <h2>나의 정보</h2>
            <p>로그인되지 않았습니다.</p>
        </div>
      </div>
    );
  }
}

export default MyInformation;
