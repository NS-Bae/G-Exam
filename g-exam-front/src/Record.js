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
function ChangoForm()
{
  const [formType, setFormType] = useState('');
  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  return (
    <div className="input_place">
      <div className="radiobtn_place">
        <label>
          <input
            type="radio"
            value="pre_exam"
            checked={formType === 'pre_exam'}
            onChange={handleFormTypeChange}
          />
          기출시험 결과
        </label>
        <label>
          <input
            type="radio"
            value="eng_word"
            checked={formType === 'eng_word'}
            onChange={handleFormTypeChange}
          />
          영단어 시험 결과
        </label>
      </div>
    </div>
  );
}


function Check()
{
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
      <p>{user.id}의 </p>
    );
  }
  else if(user.user_type === "선생")
  {
    
    return (
      <p>Teacher</p>
    );
  }
  else
  {
    return (
      <p>로그인되지 않았습니다.</p>
    );
  }
}

function MyApp() {
    return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <ChangoForm/>
        <Check/>
      </div>
    </div>
  );
}

export default MyApp;


