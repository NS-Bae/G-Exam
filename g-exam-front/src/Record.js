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

function ChangeForm({ onFormTypeChange }) {
  const [formType, setFormType] = useState('');

  console.log(formType);
  
  const handleButtonClick = async (selectedFormType) => {
    setFormType(selectedFormType);
    await handleFormTypeSubmit(selectedFormType);
  };

  async function handleFormTypeSubmit(selectedFormType) {
    try {
      const response = await fetch('/get_exam_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType: selectedFormType }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // 서버에서 받은 응답 데이터

      // 여기서 받은 데이터로 다음 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  return (
    <div className="input_place">
      <div className="radiobtn_place">
        <button
          onClick={() => handleButtonClick('pre_exam')}
          className={formType === 'pre_exam' ? 'active' : ''}
        >
          기출시험 결과
        </button>
        <button
          onClick={() => handleButtonClick('eng_word')}
          className={formType === 'eng_word' ? 'active' : ''}
        >
          영단어 시험 결과
        </button>
      </div>
    </div>
  );
}


function Check({ formType, user })
{
  console.log(formType);
  if(user.user_type === "학생")
  {
    if(formType === 'eng_word')
    {
      return (
        <div>
          <p>{user.name}의 영단어 시험 결과</p>
        </div>
      );
    }
    if(formType === 'pre_exam')
    {
      return (
        <div>
          <p>{user.name}의 기출문제 시험 결과</p>
        </div>
      );
    }
    else
    {
      return (
        <div>
          <p>{user.name}의 시험 결과 보기</p>
        </div>
      );
    }
  }
  else if(user.user_type === "선생")
  {
    
    return (
      <div>
        <p >전체학생 {formType} 시험 결과</p>
      </div>
    );
  }
  else
  {
    return (
      <p>로그인되지 않았습니다.</p>
    );
  }
}

function MyApp() 
{
  const [user, setUser] = useState([]);
  const [formType, setFormType] = useState('');

  const handleFormTypeChange = (selectedFormType) => {
    setFormType(selectedFormType);
  };

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
    return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <ChangeForm onFormTypeChange={handleFormTypeChange} />
        <Check formType={formType} user={user} />
      </div>
    </div>
  );
}

export default MyApp;


