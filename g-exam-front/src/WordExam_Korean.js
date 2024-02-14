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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [checkedRows, setCheckedRows] = useState([]);

  const handleCheckboxChange = (event, wordCategory , wordId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, { wordCategory, wordId }]);
    } else {
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((row) => row.wordId !== wordId));
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };
  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offset,
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
        setTotalCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
      })
      .catch((error) => {
        console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
      });
  };
  return(
    <div className='place'>
      <table className='third_table'>
          <thead>
          <tr>
            <td>문제 번호</td>
            <td>단어</td>
            <td>뜻1</td>
            <td>뜻2</td>
            <td>뜻3</td>
            <td>뜻4</td>
            <td>뜻5</td>
          </tr>
          </thead>
          <tbody>
          {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
            <tr key={`${result[i].word_category}_${result[i].word_id}`}>
              <td>{i}</td>
              <td>{result[i].word}</td>
              <td>{result[i].word_mean1}</td>
              <td>{result[i].word_mean2}</td>
              <td>{result[i].word_mean3}</td>
              <td>{result[i].word_mean4}</td>
              <td>{result[i].word_mean5}</td>
            </tr>
          ))}
          </tbody>
      </table>
      <div className="paging_number_place">
        {currentPage > 1 && (
          <button className="paging_number" onClick={() => handlePageClick(currentPage - 1)}>
            이전
          </button>
        )}

        <button className="paging_number" key={currentPage} onClick={() => handlePageClick(currentPage)}>
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button className="paging_number" onClick={() => handlePageClick(currentPage + 1)}>
            다음
          </button>
        )}
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

  console.log(examDetails);

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
        <p>국어단어시험</p>
        <RenderForm examType={examType}/> 
      </div>
    </div>
  );
}

export default MyApp;


