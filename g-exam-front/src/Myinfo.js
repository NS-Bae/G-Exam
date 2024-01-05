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
const UserInfoTable = ({ user }) => {
  if(user.user_type === '학생')
  {
    return (
      <table className='info_table'>
        <tbody>
          <tr>
            <td>사용자 ID</td>
            <td> : </td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>사용자 이름</td>
            <td> : </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>사용자 분류</td>
            <td> : </td>
            <td>{user.user_type}</td>
          </tr>
          <tr>
            <td>사용자 학교</td>
            <td> : </td>
            <td>{user.school_list_school_name}</td>
          </tr>
          <tr>
            <td>사용자 학년</td>
            <td> : </td>
            <td>{user.grade}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  else if(user.user_type === '선생')
  {
    return (
      <table className='info_table'>
        <tbody>
          <tr>
            <td>사용자 ID</td>
            <td> : </td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>사용자 이름</td>
            <td> : </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>사용자 분류</td>
            <td> : </td>
            <td>{user.user_type}</td>
          </tr>
          <tr>
            <td>강의 과목</td>
            <td> : </td>
            <td>{user.major_list_major_name}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

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
        <Link to = '/record'>시험결과 보러가기</Link>
      </button>{/* 
      <button className="exam_register">
        <Link to = '/record'>영단어시험 결과보기</Link>
      </button> */}
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
          <UserInfoTable user={user}/>
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
          <UserInfoTable user={user}/>
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
