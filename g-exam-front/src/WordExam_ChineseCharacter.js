import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation  } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function RenderForm({examType})
{
  if(examType === 'random')
  {
    return(
      <RandomExam />
    );
  }
  else if(examType === 'sequential')
  {
    return(
      <div className='place'>
        <p>순차입니다</p>
      </div>
    );
  }
  else
  {
    return null;
  }
}
function RandomExam()
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const examDetails = JSON.parse(decodeURIComponent(searchParams.get('examDetails')));
  const [result, setResult] = useState([]);
  const [inputValues, setInputValues] = useState(
    Array.from({ length: examDetails.questionCount }, (_, i) => ({
      key: '',
      value: '',
    }))
  );

  const fetchData = () => {
    fetch('/start_word_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examDetails,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크의 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setResult(data.data);
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const handleInputChange = (row, index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index].value = e.target.value;
    const key = `${row.word_category}_${row.word_id}`;
    newInputValues[index].key = key;
    setInputValues(newInputValues);
  };
  const handleFinish = () => {
    console.log('Input values:', inputValues);
  };
  return(
    <div className='place'>
      <table className='third_table'>
          <thead>
          <tr>
            <td>문제 번호</td>
            <td>단어</td>
            <td>뜻</td>
          </tr>
          </thead>
          <tbody>
          {Array.from({ length: result.length }, (_, i) => (
            <tr key={`${result[i].word_category}_${result[i].word_id}`}>
              <td>{i+1}</td>
              <td>{result[i].word}</td>
              <td><input value={inputValues[i].value} onChange={(e) => handleInputChange(result[i], i, e)}></input></td>
            </tr>
          ))}
          </tbody>
      </table>
      <div className='upper_btn_place'>
        <button className='letter_btn' onClick={handleFinish}>시험종료</button>
      </div>
    </div>
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
        {
          navigate('/');
          alert('로그인이 필요합니다.');
        }
      });
  }, [isLoggedIn, navigate]);
  
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <p>한문 단어시험</p>
        <RenderForm examType={examType}/> 
      </div>
    </div>
  );
}

export default MyApp;