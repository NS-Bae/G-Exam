import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import RegistPreExamForm from "./RegistPreExamForm";
import RegistWordForm from "./RegistWordForm"
import ManagementExamForm from './ManagementExamFrom';
import ManagementWordForm from './ManagementWordForm';

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
    setConfirmButtonClicked(true);
    if(selectedExamMajor === '' && selectedExamCategory === 'pre_exam')
    {
      alert("과목을 골라주세요");
    }
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
        if(selectedExamMajor !== '')
        {
          return isConfirmButtonClicked && <PreExamChoiceForm selectedExamMajor={selectedExamMajor} />;
        }
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

  const renderChoice1 = () => {
    const handleMajorListChange = (e) => {
      const selectedMajor = e.target.value;
      setSelectedExamMajor(selectedMajor);
      console.log(selectedMajor);    
    };
    if(selectedExamCategory === 'pre_exam')
    {
      return(
        <select
          id='majorcategory'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
            <option value={''}>과목</option>
            <option value={'국어'}>국어</option>
            <option value={'영어'}>영어</option>
            <option value={'수학'}>수학</option>
            <option value={'사회'}>사회</option>
            <option value={'과학'}>과학</option>
            <option value={'기타'}>기타</option>
        </select>
      );
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
          {(renderChoice1())}
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
function WorkbookChoiceForm({selectedExamCategory}) 
{
  const tag = selectedExamCategory;
  const [selectedExamMajor, setSelectedExamMajor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);


  useEffect(() => {
    const fetchSubjectList = async () => {
      try 
      {
        const response = await fetch('/get_majorlist');
        if (!response.ok) 
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setSubjectList(data.data);
        console.log(subjectList); 
      } 
      catch (error) 
      {
        console.error('과목 리스트를 불러오는 중 오류 발생:', error);
      }
    };

    fetchSubjectList(); // useEffect가 처음 실행될 때 과목 리스트를 가져옴
  }, []);

  useEffect(() => {
    const fatchTag = async () => {
      try {
        const response = await fetch('/search_classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedCategory: selectedExamMajor,
            offset: 0,
          }),
        });
  
        if (!response.ok) {
          throw new Error('tagList를 불러오지 못했습니다');
        }
  
        const data = await response.json();
        setTagList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fatchTag(); // useEffect 내에서 바로 호출
  
  }, [selectedExamMajor]);

  const handleMajorListChange = (e) => {
    const selectedMajor = e.target.value;
    setSelectedExamMajor(selectedMajor);
    console.log(selectedMajor);
  };

  const handleFirstConfirmButtonClick = () => {
    setConfirmButtonClicked(true);
    console.log(selectedExamMajor);
  };

  return (
    <div className='place'>
      <div className='upper_button_place'>
        <select
          id='category'
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
        <select id="tagsList">
          <option value={''}>선택하세요</option>
          {tagList.map((tagOption, index) => (
            <option key={index} value={tagOption.classification_name}>
              {tagOption.classification_name}
            </option>
          ))}
        </select>
        <button className='letter_btn' type='button' onClick={handleFirstConfirmButtonClick}>
          확인
        </button>
      </div>
    </div>
  );
  
  
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


