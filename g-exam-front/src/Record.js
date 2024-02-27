import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import RecordModal from './RecordModal';

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
          onClick={() => handleButtonClick('exam')}
          className={formType === 'exam' ? 'active' : ''}
        >
          일반시험 결과
        </button>
        <button
          onClick={() => handleButtonClick('word')}
          className={formType === 'word' ? 'active' : ''}
        >
          단어시험 결과
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
    if(formType === 'word')
    {
      return (
        <div>
          <p>{user.name}의 단어 시험 결과</p>
        </div>
      );
    }
    else if(formType === 'exam')
    {
      return (
        <div>
          <p>{user.name}의 시험문제 결과</p>
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
    if(formType === 'word')
    {
      return (
        <div>
          <p>전체 학생 단어 시험 결과</p>
        </div>
      );
    }
    else if(formType === 'exam')
    {
      return (
        <div>
          <p>전체 학생 일반 시험 결과</p>
        </div>
      );
    }
    
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recordInfo1, setRecordInfo1] = useState('');
  const [recordInfo2, setRecordInfo2] = useState('');
  const [recordInfo3, setRecordInfo3] = useState('');


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
    if(formType === 'word' || formType === 'exam')
    {
      fetchData();
    }
  }, [formType, user]);

  const handleUpdateClick = (row) => {
    console.log(row)
    setRecordInfo1(row.user_student_id);
    setRecordInfo2(row.exam_info);
    setRecordInfo3(row.record_info);
    openModal({row});
  };
  const openModal = () => {
    Modal.setAppElement('#root');
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const renderModalContent = () => {
    return (
      <RecordModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        recordInfo1 = {recordInfo1}
        recordInfo2 = {recordInfo2}
        recordInfo3 = {recordInfo3}
      />
    )
  };
  
  if(user.user_type === '학생' && formType !== '')
  {
    return (
      <>
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
                <td><p className='details' onClick={(e) => handleUpdateClick(record)}>자세히 보기</p></td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderModalContent()}
      </>
    );
  }
  else if(user.user_type === '선생' && formType !== '')
  {
    return (
      <>
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
                <td><p className='details' onClick={handleUpdateClick(record.record_info)}>자세히 보기</p></td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderModalContent()}
      </>
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


