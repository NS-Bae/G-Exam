import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function RenderQuestion({examDetails})
{
  const [result, setResult] = useState([]);
  const [formData, setFormData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevButtonIsDisable, setPrevButtonIsDisalee] = useState(true);
  const [nextButtonIsDisable, setNextButtonIsDisalee] = useState(false);

  const fetchExam = () =>{
    fetch('/start_exam', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examDetails,
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
      setResult(data.data);
      const initialFormData = data.data.map((item) => ({
        classification_name: item.classification_name,
        exam_id: item.exam_id,
        user_answer: '',
        choiceNumber:'',
      }));
  
      setFormData(initialFormData);
    })
    .catch((error) => {
      console.log('데이터를 불러오는 과정에서 문제가 발생했습니다.', error)
    })
  }
  useEffect(() => {
    fetchExam();
    console.log(result);
  }, []);
  useEffect(() => {
    console.log(currentIndex, prevButtonIsDisable, nextButtonIsDisable, result.length);
    if(currentIndex<result.length-1)
    {
      setNextButtonIsDisalee(false);
    }
    else
    {
      console.log('NEXT END');
      setNextButtonIsDisalee(true);
    }
    if(currentIndex === 0)
    {
      console.log('PREV END');
      setPrevButtonIsDisalee(true);
    }
    else
    {
      setPrevButtonIsDisalee(false);
    }
  });

  const handleCheckAnswer = (e) => {
    const key = e.target.dataset.key;
    const value = e.target.value;
  
    const [classificationName, examId, choiceNumber] = key.split("/");
  
    const updatedFormData = [...formData];

    if (updatedFormData[currentIndex].classification_name === classificationName && parseInt(updatedFormData[currentIndex].exam_id) === parseInt(examId))    
    {
      updatedFormData[currentIndex].user_answer = value;
      updatedFormData[currentIndex].choiceNumber = choiceNumber;
      setFormData(updatedFormData);
    } 
    else 
    {
      console.log('실패1!!');
    }
  };

  const handleCheckAnswer1 = (props) => {
    const key = props.key;
    const value = props.value;

    const [classificationName, examId] = key.split("/");
  
    const updatedFormData = [...formData];

    if (updatedFormData[currentIndex].classification_name === classificationName && parseInt(updatedFormData[currentIndex].exam_id) === parseInt(examId))    
    {
      updatedFormData[currentIndex].user_answer = value;
      setFormData(updatedFormData);
    } 
    else 
    {
      console.log('실패1!!');
    }
  }
  const handleClickPaging = (e) => {
    const pageMove = e.target.value;
    console.log("alpha",result.length, formData);
    if (pageMove === 'next') 
    {
      if (currentIndex < result.length) 
      {
        setCurrentIndex(currentIndex + 1);
      }
    }
    if (pageMove === 'prev') 
    {
      if (currentIndex > 0) 
      {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };  
  const handleFinishExam = (e) => {
    console.log(formData);

    fetch('/submit_exam_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: result,
        answer: formData,
        major: 'korean',
        examCategory: 'workbook',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크의 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data) => {
        alert(`정답 : ${data.correct}개, 오답 : ${data.wrong}개`);/* 
        navigate('/'); */
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });
  }
  return (
    <>
      {result && currentIndex < result.length && result[currentIndex].type === '객관식' && (
        <div className='place'>
          <p>{result[currentIndex].classification_name}_{result[currentIndex].exam_id}</p>
          <div className='exam_info_place'>
            <ImgPlace result={result[currentIndex]} />
            <ParagraphPlace result={result[currentIndex]} />
          </div>
          <ChoiceExamForm 
            result={result[currentIndex]} 
            nextButtonIsDisable={nextButtonIsDisable}
            prevButtonIsDisable={prevButtonIsDisable}
            onClickPaging={handleClickPaging}
            onCheckAnswer={handleCheckAnswer} 
          />
          <div className='move_button_place'>
            <button className='letter_btn' onClick={handleFinishExam}>
              시험종료
            </button>
          </div>
        </div>
      )}
      {result && currentIndex < result.length && result[currentIndex].type === '주관식' && (
        <div className='place'>
          <p>{result[currentIndex].classification_name}_{result[currentIndex].exam_id}</p>
          <div className='exam_info_place'>
            <ImgPlace result={result[currentIndex]} />
            <ParagraphPlace result={result[currentIndex]} />
          </div>
          <EssayExamForm 
            result={result[currentIndex]} 
            nextButtonIsDisable={nextButtonIsDisable}
            prevButtonIsDisable={prevButtonIsDisable}
            onClickPaging={handleClickPaging}
            onCheckAnswer={handleCheckAnswer} 
          />
          <div className='move_button_place'>
            <button className='letter_btn' onClick={handleFinishExam}>
              시험종료
            </button>
          </div>
        </div>
      )}
    </>
  );
}
function ImgPlace({result})
{
  const image = result.image;
  return (
    <>
    {image && <img src={image} alt="Preview" />}
    </>
  )
}
function ParagraphPlace({result})
{
  const paragraph = result.paragraph;
  return (
    <p>{paragraph}</p>
  )
}
function ChoiceExamForm({ result, nextButtonIsDisable, prevButtonIsDisable, onClickPaging, onCheckAnswer })
{
  const answerChoice = [];

  for (let i = 1; i <= 5; i++) {
    const choice = `choice${i}`;
    const key = `${result.classification_name}/${result.exam_id}/${choice}`;
    if (result[choice] && result[choice] !== '') {
      answerChoice.push({ key, value: result[choice] });
    }
  }
  console.log('Delta',answerChoice);
  
  return (
    <>
      <div className='answer_place'>
        <p>{result.question}</p>
        {answerChoice.map((item) => (
          <div>
            <input type='radio' id={item.key} key={item.key} name = 'answer' data-key={item.key} value={item.value} onChange={onCheckAnswer}/>{item.value}
          </div>
        ))}
      </div>
      <div className='move_button_place'>
        <button className='letter_btn' value={'prev'} disabled={prevButtonIsDisable} onClick={onClickPaging}>
          이전
        </button>
        <button className='letter_btn' value={'next'} disabled={nextButtonIsDisable} onClick={onClickPaging}>
          다음
        </button>
      </div>
    </>
  );  
}
function EssayExamForm({ result, nextButtonIsDisable, prevButtonIsDisable, onClickPaging, onCheckAnswer }) {
  const key = `${result.classification_name}/${result.exam_id}`;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onCheckAnswer({ key, value });
  };

  console.log(result);

  return (
    <>
      <div className='answer_place'>
        <p>{result.question}</p>
        <input
          type='text'
          key={key}
          name='answer'
          data-key={key}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className='move_button_place'>
        <button className='letter_btn' value={'prev'} disabled={prevButtonIsDisable} onClick={onClickPaging}>
          이전
        </button>
        <button className='letter_btn' value={'next'} disabled={nextButtonIsDisable} onClick={onClickPaging}>
          다음
        </button>
      </div>
    </>
  );
}
function MyApp() 
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examDetails = JSON.parse(decodeURIComponent(searchParams.get('examDetails')));
  const examType = examDetails.examType;
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    fetch('/checksession')
      .then(response => response.json())
      .then(data => {
        if (data.isLoggedIn) 
        {
          setIsLoggedIn(true);
        }
        else
        {/* 
          navigate('/'); */
          alert('로그인이 필요합니다.');
        }
      });
  }, [isLoggedIn, navigate]);
  console.log(examDetails);
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <RenderQuestion examDetails = {examDetails}/>
      </div>
    </div>
  );
}

export default MyApp;


