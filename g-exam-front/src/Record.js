import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
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

function Check({ formType, user, selectedExamMajor, selectedSchoolGrade })
{
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
          <p>{selectedSchoolGrade}학생 {selectedExamMajor}단어 시험 결과</p>
        </div>
      );
    }
    else if(formType === 'exam')
    {
      return (
        <div>
          <p>{selectedSchoolGrade} 학생 {selectedExamMajor}일반 시험 결과</p>
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

function RecordTable({ formType, user, selectedExamMajor, selectedSchoolGrade })
{
  const [examRecords, setExamRecords] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recordInfo1, setRecordInfo1] = useState('');
  const [recordInfo2, setRecordInfo2] = useState('');
  const [recordInfo3, setRecordInfo3] = useState('');

  const fetchData = async () => {
    if (formType === 'word' || formType === 'exam') {
      try {
        const record_response = await fetch('/api/get_exam_record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formType, user, selectedExamMajor, selectedSchoolGrade }),
        });

        if (!record_response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }

        const record_data = await record_response.json();
        setExamRecords(record_data.examRecords);
      } catch (error) {
        console.error('데이터를 가져오는 과정에서 문제가 발생하였습니다.', error);
      }
    }
  };
  useEffect(() => {
    fetchData();
    console.log(selectedExamMajor, selectedSchoolGrade);
  }, [formType, user, selectedExamMajor, selectedSchoolGrade]);

  const handleUpdateClick = (row) => {
    setRecordInfo1(row.user_student_id);
    setRecordInfo2(row.exam_info);
    setRecordInfo3(row.record_info);
    openModal({row});
  };
  const handleDeleteClick = (row) => {
    if(window.confirm("기록을 삭제하시겠습니까?"))
    {
      fetch('/api/delete_record', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          row,
          formType,
        }),
      })
      .then((response) => {
        if(!response.ok)
        {
          throw new Error('네트워크의 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        alert(data.message);
        fetchData();
      })
      .catch((error) => {
        console.log('데이터를 불러오는 과정에서 문제가 발생했습니다.', error)
      })
    }
    else
    {
      return null;
    }
  }

  const openModal = () => {
    Modal.setAppElement('#root');
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const renderModalContent = () => {
    if (modalIsOpen) 
    {
      return (
        <RecordModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          recordInfo1={recordInfo1}
          recordInfo2={recordInfo2}
          recordInfo3={recordInfo3}
        />
      );
    } 
    else 
    {
      return null;
    }
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
        {formType && user.user_type && (
        <table className='record_table'>
          <thead>
            <tr>
              {user.user_type === '학생' ? (
                <>
                  <th>시험 정보</th>
                  <th>점수</th>
                </>
              ) : (
                <>
                  <th>학생 아이디</th>
                  <th>시험 정보</th>
                  <th>점수</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {examRecords.map((record, index) => (
              <tr key={index}>
                {user.user_type === '학생' ? (
                  <>
                    <td>{record.exam_info}</td>
                    <td>{record.score}</td>
                  </>
                ) : (
                  <>
                    <td>{record.user_student_id}</td>
                    <td>{record.exam_info}</td>
                    <td>{record.score}</td>
                  </>
                )}
                <td>
                  <p className='details' onClick={() => handleUpdateClick(record)}>
                    자세히 보기
                  </p>
                </td>
                <td>
                  <p className='details' onClick={() => handleDeleteClick(record)}>
                    삭제
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {renderModalContent()}
      </>
    );
  }
  if(formType === '')
  {
    <p>보고싶은 시험의 결과를 선택해주세요.</p>
  }
}

function SelectOption({
  user,
  selectedExamMajor,
  setSelectedExamMajor,
  selectedSchoolGrade,
  setSelectedSchoolGrade,
})
{
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const fetchSubjectList = async () => {
      try 
      {
        const response = await fetch('/api/get_majorlist');
        if (!response.ok) 
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setSubjectList(data.data);
      } 
      catch (error) 
      {
        console.error('과목 리스트를 불러오는 중 오류 발생:', error);
      }
    };
    fetchSubjectList(); // useEffect가 처음 실행될 때 과목 리스트를 가져옴
  }, []);

  const handleMajorListChange = (e) => {
    const selectedMajor = e.target.value;
    setSelectedExamMajor(selectedMajor);
  };
  const handleSchoolGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedSchoolGrade(selectedGrade);
  };

  return (
    <div className='upper_button_place'>
      <select
          id='major'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
          <option value={'select'}>선택하세요</option>
          {subjectList.map((subject) => (
            <option key={subject.major_name} value={subject.major_name}>
              {subject.major_name}
            </option>
          ))}
        </select>
        {user.user_type === '선생' && (
          <select
            id='schoolgrade'
            onChange={handleSchoolGradeChange}
            value={selectedSchoolGrade}
          >
            <option value={'select'}>선택하세요</option>
            <option value={'초등'}>초등</option>
            <option value={'중등'}>중등</option>
            <option value={'고등'}>고등</option>
          </select>
        )}
    </div>
  )
}

function MyApp() 
{
  const [user, setUser] = useState([]);
  const [formType, setFormType] = useState('');
  const [selectedExamMajor, setSelectedExamMajor] = useState('select');
  const [selectedSchoolGrade, setSelectedSchoolGrade] = useState('select');
  const navigate = useNavigate();

  const handleFormTypeChange = (selectedFormType) => {
    setFormType(selectedFormType);
  };
  const handleConfirmButtonClick = () => {
    setSelectedExamMajor(selectedExamMajor);
    setSelectedSchoolGrade(selectedSchoolGrade);
  }

  useEffect(() => {
    fetch('/api/profile')
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
        alert('로그인이 필요합니다.');
        navigate('/');
      });
  }, []);
    return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <ChangeForm onFormTypeChange={handleFormTypeChange} />
        <Check formType={formType} user={user} 
          selectedExamMajor={selectedExamMajor}
          selectedSchoolGrade={selectedSchoolGrade} />
        <SelectOption
          user={user}
          selectedExamMajor={selectedExamMajor}
          setSelectedExamMajor={setSelectedExamMajor}
          selectedSchoolGrade={selectedSchoolGrade}
          setSelectedSchoolGrade={setSelectedSchoolGrade}
          onConfirmButtonClick={handleConfirmButtonClick}
          />
        <RecordTable 
          formType={formType}
          user={user}
          selectedExamMajor={selectedExamMajor}
          selectedSchoolGrade={selectedSchoolGrade}
        />
      </div>
    </div>
  );
}

export default MyApp;