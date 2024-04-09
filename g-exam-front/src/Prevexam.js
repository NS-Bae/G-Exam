import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';

function convertKorean(selectedCategory) 
{
  const conversion = {
    '국어' : 'korean', 
    '영어' : 'english', 
    '과학' : 'science', 
    '한문' : 'chinesecharacter', 
    '역사' : 'history', 
    '기타' : 'etc', 
  }

  return conversion[selectedCategory] || selectedCategory;
}
function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MajorSelection({ isLoggedIn }) {
  const [showChoiceRandom, setShowChoiceRandom] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');
  const exambtntype = [
    { id: '국어', title: '국어 시험' },
    { id: '영어', title: '영어 시험' },
    { id: '수학', title: '수학 시험' },
    { id: '사회', title: '사회 시험' },
    { id: '과학', title: '과학 시험' },
    { id: '기타', title: '기타 시험' },
  ];

  const handleMajorSelection = (id) => {
    setSelectedMajor(id);
    setShowChoiceRandom(true);
  };
  const handleBackButtonClick = () => {
    setShowChoiceRandom(false);
    setSelectedMajor('');
  };

  return (
    <div className='place'>
      {selectedMajor ? (
        <ChoiceRandom selectedMajor={selectedMajor} onBackButtonClick={handleBackButtonClick}/>
      ) : (
        <div className='btnsection'>
          <ul>
            {exambtntype.map((btn, index) => (
              <li key={index}>
                <button
                  className="test_btn"
                  onClick={() => {
                    if (isLoggedIn) {
                      handleMajorSelection(btn.id);
                    } else {
                      alert('로그인이 필요합니다.');
                    }
                  }}
                >
                  {btn.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
function ChoiceRandom({selectedMajor, onBackButtonClick})
{
  const [formType, setFormType] = useState('');
  const [nowExamType, setNowExamType] = useState('select');
  const [saveNumber, setSaveNumber] = useState(0);
  const [startNumber, setStartNumber] = useState(0);
  const [isExamButtonEnabled, setIsExamButtonEnabled] = useState(false);
  const [showStartNumberInput, setShowStartNumberInput] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]); 
  const navigate = useNavigate();
  const major = selectedMajor;
  const examDetails = {
    examSection: 'pre_exam',
    examControl: nowExamType,
    examType: formType,
    subject: major,
    questionCount: saveNumber,
    startNumber: startNumber,
    selectedTag: selectedValues,
  };
  const conversion = convertKorean(major);
  let new_verification = false;
  
  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setShowStartNumberInput(e.target.value === 'sequential');
  };
  const handleInputNumber = (e) => {
    const numberOfQuestion = e.target.value;
    setSaveNumber(numberOfQuestion);
  };
  const handleInputStartNumber = (e) => {
    const numberOfQuestion = e.target.value;
    setStartNumber(numberOfQuestion);
  };
  const clickConfirmButton = async () => {
    if(formType === 'sequential' && selectedValues.length > 1) 
    {
      alert('순차 출제에서는 태그를 하나만 선택할 수 있습니다.');
      return;
    }
    await fetch('/api/verification_exam', {   
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examDetails: examDetails
      }),
    })
    .then((response) => {
      if (response.status === 200) {
        new_verification = true;
        console.log('Success');
      } 
      else if (response.status === 201) {
        return response.json().then((data) => {
          new_verification = false;
          alert(data.message);
        });
      }
    })
    .catch((error) => {
      alert(error);
      console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
    });
    if(new_verification === false || nowExamType === 'select' || saveNumber === 0 || saveNumber === '' || formType === '' || selectedValues === '' || selectedValues.length === 0)
    {
      setIsExamButtonEnabled(false);
      let alertMessage1 = '', alertMessage2 = '', alertMessage3 = '', alertMessage4 = '';
      if(saveNumber === 0 || saveNumber === '' || new_verification === false)
      {
        alertMessage1 = "문항 수를 확인해주세요";
      }
      if(formType === '')
      {
        alertMessage2 = "랜덤인지 순차출제인지 선택해주세요";
      }
      if(selectedValues === '' || selectedValues.length === 0)
      {
        alertMessage3 = "출제될 문제의 태그를 선택해주세요";
      }
      if(nowExamType === 'select')
      {
        alertMessage4 = "문제가 객관식인지 주관식인지 선택해주세요";
      }
      const alertMessage = [alertMessage1, alertMessage2, alertMessage3, alertMessage4]
        .filter(message => message !== '')
        .join(', ');
      alert(alertMessage);
      console.log(alertMessage1, ', ', alertMessage2, ', ', alertMessage3, ', ', alertMessage4);
    }
    else
    {
      setIsExamButtonEnabled(true);
    }
  };
  const handleGoExam = () => {
    navigate(`/prevexam/${conversion}?examDetails=${encodeURIComponent(JSON.stringify(examDetails))}`);
  };
  const handleSelectedValuesUpdate = (values) => {
    setSelectedValues(values);
  };
  const handleGoBack = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }
  };
  const handleExamTypeChange = (e) =>{
    const examType = e.target.value;
    console.log(examType);
    setNowExamType(examType);
  }

  return (
    <div className="place">
      <div className="radiobtn_place">
        <label>
          <input
            type="radio"
            value="random"
            checked={formType === 'random'}
            onChange={handleFormTypeChange}
          />
          랜덤 출제
        </label>
        <label>
          <input
            type="radio"
            value="sequential"
            checked={formType === 'sequential'}
            onChange={handleFormTypeChange}
          />
          순차 출제
        </label>
      </div>
      <ChoiceTag selectedMajor = {major} onSelectedValuesUpdate={handleSelectedValuesUpdate}/>
      <div className='value'>
        <h3>시험 방식 : &nbsp;&nbsp;</h3>
        <select className='short_selection' value={nowExamType} onChange={handleExamTypeChange}>
          <option value = {'select'}>선택하세요</option>
          <option value = {'choice'}>객관식</option>
          <option value = {'essay'}>주관식</option>
          <option value = {'all'}>객관식 + 주관식</option>
        </select>
      </div>
      <div className='value'>
        <h3>문항 수 :&nbsp;&nbsp;</h3>
        <input type='number' className='small_input' onChange={handleInputNumber} />
        {showStartNumberInput && (
          <>
            <h3>시작 번호 :&nbsp;&nbsp;</h3>
            <input type="number" className="small_input" onChange={handleInputStartNumber} />
          </>
        )}
        <button className='letter_btn' onClick={clickConfirmButton}>
          확인
        </button>
      </div>
      <div className='btn_section'>
        <button
          className='letter_btn'
          disabled={!isExamButtonEnabled}
          onClick={handleGoExam}
        >
          시험보러가기
        </button>
        <button className='letter_btn' onClick={handleGoBack}>
          뒤로가기
        </button>
      </div>
      <QRCode value={`https://gplan29.com/prevtest/${conversion}?examDetails=${encodeURIComponent(JSON.stringify(examDetails))}`} />
    </div>
  );
}
function ChoiceTag({ selectedMajor, onSelectedValuesUpdate })
{
  const major = selectedMajor;
  const [selectedClassification, setSelectedClassification] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [classificationList, setClassificationList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  //분류 불러오기
  const fetchClassification = async () => {
    try 
    {
      fetch('/api/get_classification', {   
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type: 'pre_exam',
          selectedMajor: major,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크의 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setClassificationList(data.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });;
    } 
    catch (error) 
    {
      console.error('과목 리스트를 불러오는 중 오류 발생:', error);
    }
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    // 선택된 값이 새로운 배열에 없으면 추가
    if (!selectedValues.includes(selectedValue)) {
      setSelectedValues([...selectedValues, selectedValue]);
    }
    setSelectedClassification(selectedValue);
  };
  const handleRemoveButton = (valueToRemove) => {
    const updatedValues = selectedValues.filter(value => value !== valueToRemove);
    setSelectedValues(updatedValues);
  };
  useEffect(() => {
    if (onSelectedValuesUpdate) {
      onSelectedValuesUpdate(selectedValues);
    }
  }, [selectedValues, onSelectedValuesUpdate ]);

  useEffect(() => {
    if(!isLoaded)
    {
      fetchClassification();
    }
  }, [isLoaded]);

  return (
    <div className='place'>
      <select
        id='classification'
        onChange = {handleSelectChange}
        value = {selectedClassification}
        className = 'long_selection'
        >
        <option value = {'select'}>선택하세요</option>
        {classificationList.map((item) => (
          <option
          key = {item.classification_name}
          value = {item.classification_name}
          >
            {item.classification_name}
          </option>
        ))}
      </select>
      <div className='value_place'>
        {selectedValues.map((value) => (
          <div className='value' key={value}>
            <p>{value}</p>
            <button className='remove_button' onClick={() => handleRemoveButton(value)}> X </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function MyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/checksession")
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          navigate("/");
          alert("로그인이 필요합니다.");
        }
      });
  }, [isLoggedIn, navigate]);

  return (
    <div className='background'>
      <div className='wrap'>
        <Main />
        <MajorSelection isLoggedIn />
      </div>
    </div>
  );
}

export default MyApp;