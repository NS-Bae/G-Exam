import './App.css';
import React from 'react';
import { useRef } from 'react';
import RegistExam from './RegistPreExamForm.js'

function RegistForm({ onChangeFormBackClick })
{
  const qRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const aRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const selLevelRef = useRef(null);
  const tagRef = useRef(null);

  const handleBackButtonClick =() => {
    onChangeFormBackClick();
  };

  const handleConfirmButtonClick = () => {
    const wordTag = tagRef.current.value;
    const selectedLevel = selLevelRef.current.value;

    if (!wordTag || !selectedLevel || selectedLevel === "select") {
      console.log('wordTag or selectedLevel is null, undefined, or "select". Skipping the request.');
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

    fetch('/save_eng_word', {
      method : 'POST', 
      headers: {
        'Content-Type' : 'application/json',
      }, 
      body : JSON.stringify({
        wordSave: validWordSave,
        wordTag, 
        selectedLevel,
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
      return (
        <div className = 'place'>
          <div className="sel_option">
            <div className="category">
                <h3>문제 유형</h3>
                <select name="level" id="sel_level" ref={selLevelRef} required >
                    <option value="select">선택하세요</option>
                    <option value="eng_word_elementary">초등</option>
                    <option value="eng_word_middle">중등</option>
                    <option value="eng_word_high">고등</option>
                    <option value="eng_word_toeic">토익</option>
                </select>
            </div>
            <div className="word_tag">
                <h3>문제 태그</h3>
                <input type="text" name="word_tag" id="tag" ref={tagRef} placeholder="영단어 정보" />
            </div>
          </div>
          <p>영단어의 뜻을 입력할 때 뜻과 뜻 사이에 "/"로 구분해주세요(최대 4개)</p>
          <table className='third_table'>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i}>
                  <td><textarea className="answer_box" ref={qRefs[i]} placeholder="EN_WORD"></textarea></td>
                  <td><textarea className="answer_box" ref={aRefs[i]} placeholder="KO_WORD"></textarea></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='btn_section'>
            <button className='letter_btn' type='submit' onClick= {handleConfirmButtonClick}>
                등록하기
            </button>
            <button className="exam_register" onClick={handleBackButtonClick}>뒤로가기</button>
          </div>
        </div>
      );
    
  
};


export default RegistForm;