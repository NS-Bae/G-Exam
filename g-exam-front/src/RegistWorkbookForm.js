import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function WorkbookChoiceForm() 
{
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
    console.log(selectedExamMajor);
    const fatchTag = async () => {
      try {
        const response = await fetch('/search_classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form_type:"exam",
            selectedCategory: selectedExamMajor,
            offset: 0,
          }),
        });
  
        if (!response.ok) {
          throw new Error('tagList를 불러오지 못했습니다');
        }
  
        const data = await response.json();
        setTagList(data.data);
      } 
      catch (error) 
      {
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

export default WorkbookChoiceForm;