import './App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MyApp() 
{
  const [id, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [name, setName] = useState('');
  const[schoolsList, setSchoolsList] = useState([]);
  const navigate = useNavigate();

  const handleSchoolTypeChange = (e) => {
    const selectedSchool = e.target.value;
  
    // 백엔드로 선택한 학교 유형을 보냅니다
    fetch(`/get_school_details?school=${selectedSchool}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.schoolDetails) {
          setSchoolsList(data.schoolDetails);
        }
      })
      .catch((error) => console.error('학교 목록 불러오기 오류:', error));
  };
  const handleGetPW = () => {
    console.log(id, name, grade, school);
    fetch('/get_pw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, 
        name, 
        grade, 
        school,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.data) 
      {
        alert(`당신의 비밀번호는 ${data.data[0].pw} 입니다.`); 
        navigate('/login');
        setUsername('');
        setName('');
        setGrade('');
        setSchool('');
      } 
      else if (data.error) 
      {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error('네트워크 오류:', error);
    });
  }
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <h2>교사 혹은 관리자에게 문의하시길 바랍니다.</h2>
        <div className="input_place">
          <label>아이디</label>
          <input
            id='id'
            type="text"
            value={id}
            placeholder='ID'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>이름</label>
          <input
            id='name'
            type="name"
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>학교</label>
          <div className='select_place'>
            <select id='school_grade' onChange={handleSchoolTypeChange}>
              <option value={''}>선택하세요</option>
              <option value={'초등'}>초등학교</option>
              <option value={'중등'}>중학교</option>
              <option value={'고등'}>고등학교</option>
            </select>
            <select id="school_details" onChange={(e) => setSchool(e.target.value)}>
              <option value={''}>선택하세요</option>
              {schoolsList.map((schoolOption, index) => (
                <option key={index} value={schoolOption.school_name}>
                  {schoolOption.school_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input_place">
          <label>학년</label>
          <input
            id='grade'
            type="number"
            value={grade}
            placeholder='GRADE'
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button className='test_btn' type="submit" onClick={handleGetPW}>비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default MyApp;