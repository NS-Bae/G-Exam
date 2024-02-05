import './App.css';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import RegistExam from './RegistPreExamForm.js'

function RegistForm({ onChangeFormBackClick })
{
  const [selectedClassification, setSelectedClassification] = useState('');//선택된 분류값
  const [classificationList, setClassificationList] = useState([]);//백엔드 호출해서 받아오는 분류값
  const [selectedMajor, setSelectedMajor] = useState('');//선택된 대분류(과목)
  const qRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const aRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const form_type = "word";

  useEffect(() => {
    const fetchClassificationList = async () => {
      try 
      {
        fetch('/get_classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form_type,
            selectedMajor,
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

    fetchClassificationList(); // useEffect가 처음 실행될 때 과목 리스트를 가져옴
  }, [selectedMajor]);

  const handleConfirmButtonClick = () => {
    if (!selectedClassification || !selectedMajor || selectedMajor === "select") {
      console.log('selectedClassification or selectedMajor is null, undefined, or "select". Skipping the request.');
      alert('올바른 단어 태그와 레벨을 선택하세요.');
      return;
    }
    
    const wordSave = Array.from ({ length : 10 }, (_, i) => {
      const engWord = qRefs[i].current.value;
      const korWord = aRefs[i].current.value;
  
      const korWordArray = korWord.split('/');

      qRefs[i].current.value = '';
      aRefs[i].current.value = '';

      return { engWord, korWord : korWordArray};
    });

    const validWordSave = wordSave.filter(
      item => item.engWord.trim() !== '' && item.korWord.length > 0
    );

    fetch('/save_word', {
      method : 'POST', 
      headers: {
        'Content-Type' : 'application/json',
      }, 
      body : JSON.stringify({
        wordSave: validWordSave,
        selectedClassification, 
        selectedMajor,
      }),
    })
    .then(response => {
      if(!response.ok)
      {
        throw new Error('네트워크의 응답이 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
    })
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  return (
    <div className = 'place'>
      <div className="sel_option">
        <div className="category">
            <h3>문제 유형</h3>
            <select name="category" id="category" value={selectedMajor} onChange={handleMajorChange} required >
              <option value="select">선택하세요</option>
              <option value="국어">국어</option>
              <option value="한문">한문</option>
              <option value="영어">영어</option>
              <option value="역사">역사</option>
              <option value="과학">과학</option>
              <option value="기타">기타</option>
            </select>
        </div>
        <div className="category">
          <h3>문제 태그</h3>
          <select
            id='classification'
            onChange={(e) => setSelectedClassification(e.target.value)}
            value={selectedClassification}
          >
            <option value={'select'}>선택하세요</option>
            {classificationList.map((item) => (
              <option key={item.word_category} value={item.word_category}>
                {item.word_category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p>단어의 뜻을 입력할 때 뜻과 뜻 사이에 "/"로 구분해주세요(최대 4개)</p>
      <table className='third_table'>
        <tbody>
          {Array.from({ length: 10 }, (_, i) => (
            <tr key={i}>
              <td><textarea className="answer_box" ref={qRefs[i]} placeholder="단어"></textarea></td>
              <td><textarea className="answer_box" ref={aRefs[i]} placeholder="뜻"></textarea></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='btn_section'>
        <button className='letter_btn' type='submit' onClick= {handleConfirmButtonClick}>
            등록하기
        </button>
      </div>
    </div>
  );
};


export default RegistForm;