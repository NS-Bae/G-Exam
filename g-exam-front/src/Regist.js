import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function ChoiceForm() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedManagement, setSelectedManagement] = useState('');
    const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  
    const handleConfirmButtonClick = () => {
      setConfirmButtonClicked(true);
    };
  
    return (
      <div className = 'place'>
        <div className='upper_button_place'>
          <select
            id='category'
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
              <option value={''}>선택하세요</option>
              <option value={'영단어'}>영단어</option>
              <option value={'국어'}>국어</option>
              <option value={'영어'}>영어</option>
              <option value={'수학'}>수학</option>
              <option value={'사회'}>사회</option>
              <option value={'과학'}>과학</option>
              <option value={'기타'}>기타</option>
          </select>
          <select
            id='management'
            onChange={(e) => setSelectedManagement(e.target.value)}
            value={selectedManagement}
          >
              <option value={''}>선택하세요</option>
              <option value={'등록'}>등록하기</option>
              <option value={'관리'}>관리하기</option>
          </select>
          <button className='letter_btn' type='submit' onClick={handleConfirmButtonClick}>
            확인
          </button>
        </div>
        {isConfirmButtonClicked && (
            <RegistForm
              selectedCategory={selectedCategory}
              selectedManagement={selectedManagement}
            />
          )}
      </div>
    );
}
function RegistForm ({ selectedCategory, selectedManagement })
{
  const qRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const aRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const selLevelRef = useRef(null);
  const tagRef = useRef(null);

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
        selectedCategory,
        selectedManagement,
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
  }

  if(selectedManagement === '관리')
  {
    if(selectedCategory === '영단어')
    {
      return (
        <div className = 'place'>
          <table className='third_table'>
          <thead>
            <tr>
              <th>영단어 정보</th>
              <th>영단어</th>
              <th>뜻1</th>
              <th>뜻2</th>
              <th>뜻3</th>
              <th>뜻4</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
          </table>
        </div>
      );
    }
    else if(selectedCategory === '국어')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '영어')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '수학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '사회')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '과학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '기타')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
  }
  else if(selectedManagement === '등록')
  {
    if(selectedCategory === '영단어')
    {
      return (
        <div className = 'place'>
          <div className="sel_option">
            <div className="category">
                <h3>문제 유형</h3>
                <select name="level" id="sel_level" ref={selLevelRef} required >
                    <option value="select">선택하세요</option>
                    <option value="elementary">초등</option>
                    <option value="middle">중등</option>
                    <option value="high">고등</option>
                    <option value="toeic">토익</option>
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
          <button className='letter_btn' type='submit' onClick= {handleConfirmButtonClick}>
              등록하기
          </button>
        </div>
      );
    }
    else if(selectedCategory === '국어')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '영어')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '수학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '사회')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '과학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '기타')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
  }
  else
  {
    return (
      <p>선택해주세요!</p>
    );
  }
    
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
    if(user.user_type !== "선생")
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
                <ChoiceForm/>
              </div>
            </div>
          );
    }
};

export default MyApp;


