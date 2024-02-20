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
  const [user, setUser] = useState([]);
  const fetchUserInfo = async () => {
    try 
    {
      const response = await fetch('/profile');
      if (!response.ok) 
      {
        throw new Error('HTTP 오류 ' + response.status);
      }
      const data = await response.json();
      setUser(data.user);
    } 
    catch (error) 
    {
      console.error('로그인이 되어있지 않습니다.', error);
    }
  };
  
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return(
    <RandomExam user = {user}/>
  );
}
function RandomExam({user})
{
  const location = useLocation();
  const navigate = useNavigate();
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
        const testData = data.data;
        setResult(data.data);
        console.log(data.data.length, testData.length);
        const newInputValues = [...inputValues];
        for(const i in testData)
        {
          const key = `${testData[i].word_category}/${testData[i].word_id}`;
          console.log(key);
          newInputValues[i].key = key;
          setInputValues(newInputValues);
        }
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });
  };
  const SubmitAnswer = () =>{
    fetch('/submit_word_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: inputValues,
        major: 'history',
        user, 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크의 응답이 좋지 않습니다.');
        }
        return response.json();
      })
      .then((data) => {
        alert(`정답 : ${data.correct}개, 오답 : ${data.wrong}개`);
        navigate('/');
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (row, index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index].value = e.target.value;
    const key = `${row.word_category}/${row.word_id}`;
    newInputValues[index].key = key;
    setInputValues(newInputValues);
  };
  const handleFinish = () => {
    let empty = 0;
    for(const i in inputValues)
    {
      if(inputValues[i].value === '')
      {
        empty++;
      }
    }
    if(empty>0)
    {
      const confirmation = window.confirm('답이 전부 입력되지 않았습니다. 시험을 종료하시겠습니까?');
      if(confirmation === true)
      {
        console.log('시험중단', confirmation);
        SubmitAnswer();
      }
      else
      {
        console.log('시험재개', confirmation);
      }
    }
    else
    {
      const confirmation = window.confirm('답안을 제출하시겠습니까?');
      if(confirmation === true)
      {
        //시험종료
        console.log('시험종료', confirmation);
        SubmitAnswer();
      }
      else
      {
        //시험재개
        console.log('시험재개', confirmation);
      }
    }
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