import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import RegistPreExamForm from "./RegistPreExamForm";
import RegistWordForm from "./RegistWordForm"
import RegistWorkbookForm from "./RegistWorkbookForm";
import ManagementExamForm from './ManagementExamFrom';
import ManagementWordForm from './ManagementWordForm';
import ManagementWorkbookForm from './ManagementWorkbookForm';


function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
};

function ChoiceForm1 () {
  const [selectedExamCategory, setSelectedExamCategory] = useState(''); //기출, 일반, 단어
  const [selectedQuestionManagement, setSelectedQuestionManagement] = useState(''); //등록, 관리
  const [selectedExamMajor, setSelectedExamMajor] = useState(''); // 기출문제용 과목 선택
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);

  const handleFirstConfirmButtonClick = () => {
    setConfirmButtonClicked(true);/* 
    if(selectedExamMajor === '' && selectedExamCategory === 'pre_exam')
    {
      alert("과목을 골라주세요");
    } */
  };

  const handleExamCategoryChange = (e) => {
    setSelectedExamCategory(e.target.value);
  };

  const handleQuestionManagementChange = (e) => {
    setSelectedQuestionManagement(e.target.value);
  };

  const renderChoice2 = () => {
    if(selectedQuestionManagement === "등록")
    {
      if(selectedExamCategory === 'workbook')
      {
        return isConfirmButtonClicked && <WorkbookChoiceForm selectedExamCategory={selectedExamCategory} />;
      }
      else if(selectedExamCategory === 'pre_exam')
      {
          return isConfirmButtonClicked && <PreExamChoiceForm />;
      }
      else if(selectedExamCategory === 'word')
      {
        return isConfirmButtonClicked && <WordChoiceForm selectedExamCategory={selectedExamCategory} />;
      }
      else
      {
        return null;
      }
    }
    else if (selectedQuestionManagement === "관리")
    {
      if(selectedExamCategory === 'workbook')
      {
        return isConfirmButtonClicked && <ManagementWorkbookForm />;
      }
      else if(selectedExamCategory === 'pre_exam')
      {
        return isConfirmButtonClicked && <ManagementExamForm selectedCategory={selectedExamMajor} />;
      }
      else if(selectedExamCategory === 'word')
      {
        return isConfirmButtonClicked && <ManagementWordForm />;
      }
      else
      {
        return null;
      }
    }
  };

  useEffect(() => {
    if (selectedExamCategory !== '' || selectedExamMajor !== '' || selectedQuestionManagement !== '') {
      setConfirmButtonClicked(false);
    }
  }, [selectedExamCategory, selectedExamMajor, selectedQuestionManagement]);

  return (
    <div className = 'place'>
      <div className='place'>
        <p>문제의 종류를 골라주세요.(일반/기출/단어)</p>
        <div className='upper_button_place'>
          <select
            id='examcategory'
            onChange={handleExamCategoryChange}
            value={selectedExamCategory}
          >
              <option value={''}>선택하세요</option>
              <option value={'workbook'}>일반문제</option>
              <option value={'pre_exam'}>기출문제</option>
              <option value={'word'}>단어</option>
          </select>
          <select
            id='management'
            onChange={handleQuestionManagementChange}
            value={selectedQuestionManagement}
          >
              <option value={''}>선택하세요</option>
              <option value={'등록'}>등록하기</option>
              <option value={'관리'}>관리하기</option>
          </select>
          <button className='letter_btn' type='button' onClick={handleFirstConfirmButtonClick}>
            확인
          </button>
        </div>
      </div>
      {(renderChoice2())}
    </div>
  );

};
//임시
function WorkbookChoiceForm() 
{
  return <RegistWorkbookForm />
};

function PreExamChoiceForm({selectedExamMajor}) 
{
  return (<RegistPreExamForm selectedCategory = {selectedExamMajor}/>);
};

function WordChoiceForm({selectedExamMajor}) 
{
  return (<RegistWordForm />);
};


function MyApp() 
{
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

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
        if(data.user.user_type !== '선생')
        {
          alert('교사용 페이지입니다.');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('세션 정보를 가져오는 중 오류 발생:', error);
        alert('교사용 페이지입니다.');
        navigate('/');
      });
  }, []);

    if(user.user_type === "학생")
    {
        return (
            <div className = "background">
              <div className = "wrap">
                <Main/>
                <p>교사용 페이지입니다.</p>
              </div>
            </div>
          );
    }
    else
    {
        return (
            <div className = "background">
              <div className = "wrap">
                <Main/>
                <ChoiceForm1/>
              </div>
            </div>
          );
    }
};

export default MyApp;


