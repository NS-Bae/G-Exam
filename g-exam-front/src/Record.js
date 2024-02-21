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
  
  const handleButtonClick =  (selectedFormType) => {
    setFormType(selectedFormType);
    onFormTypeChange(selectedFormType); 
  };

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
          단어 시험 결과
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
          <p>{user.name}의 결과 보기</p>
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

function RecordTable({ formType, user })
{
  const [examRecords, setExamRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const record_response = await fetch('/get_exam_record', {
          method : 'POST', 
          headers : {
            'Content-Type' : 'application/json',
          }, 
          body : JSON.stringify({formType, user}),
        });

        if(!record_response.ok)
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }

        const record_data = await record_response.json();

        setExamRecords(record_data.examRecords);
      }
      catch(error)
      {
        console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
      }
    };
    if(formType === 'eng_word' || formType === 'pre_exam')
    {
      fetchData();
    }
  }, [formType, user]);

  
  if(user.user_type === '학생' && formType !== '')
  {
    return (
      <table className='record_table'>
        <thead>
          <tr>
            <th>시험 정보</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {examRecords.map((record, index) => (
            <tr key = {index}>
              <td>{record.exam_info}</td>
              <td>{record.score}</td>
              <td><p className='details'>자세히 보기</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  else if(user.user_type === '선생' && formType !== '')
  {
    return (
      <table className='record_table'>
        <thead>
          <tr>
            <th>학생 아이디</th>
            <th>시험 정보</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {examRecords.map((record, index) => (
            <tr key = {index}>
              <td>{record.user_student_id}</td>
              <td>{record.exam_info}</td>
              <td>{record.score}</td>
              <td><p className='details'>자세히 보기</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if(formType === '')
  {
    <p>보고싶은 시험의 결과를 선택해주세요.</p>
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
        <RecordTable formType={formType} user={user}/>
      </div>
    </div>
  );
}

export default MyApp;


