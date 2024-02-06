import './App.css';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import UpdateModal from './UpdateWordModal';

function ManagementWordForm() 
{  
  const [selectedClassification, setSelectedClassification] = useState('');//선택된 분류값
  const [classificationList, setClassificationList] = useState([]);//백엔드 호출해서 받아오는 분류값
  const [selectedMajor, setSelectedMajor] = useState('');//선택된 대분류(과목)
  const tagRef = useRef(null);
  const [result, setResult] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //word_category 호출
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
            form_type:"word",
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

  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;

    fetch('/search_table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedClassification,
        selectedMajor,
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

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const handleConfirmButtonClick = () => {
    if (!selectedMajor || selectedMajor === "select") {
      alert('올바른 단어 태그와 레벨을 선택하세요.');
      return;
    }
    fetchData(1);
  };
  // 삭제기능
  const handleDeleteButton = () => {
    const confirmation = window.confirm('정말로 영단어를 삭제하시겠습니까?');
    if(confirmation)
    {
      fetch('/delete_word', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRows: checkedRows,
          selectedMajor,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        alert("영단어를 삭제하였습니다");
        fetchData(1);
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
      });
    }
  };

  const openModal = async (type) => {
    Modal.setAppElement('#root');
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
    fetchData(1);
  };

  const handleCheckboxChange = (event, wordCategory , wordId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, { wordCategory, wordId }]);
    } else {
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((row) => row.wordId !== wordId));
    }
  };

  const renderModalContent = () => {
    if (modalType === 'update') {
      return (
        <UpdateModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleCheckboxChange={handleCheckboxChange}
          checkedRows={checkedRows}
          selectedLevel = {selectedMajor}
        />
      );
    }
  };
  return (
    <div className='place'>
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
          <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
          확인
          </button>
      </div>
      <p>문제태그 미선택시 전체 영단어가 조회됩니다.</p>
      <table className='third_table'>
          <thead>
          <tr>
              <td>체크</td>
              <td>분류</td>
              <td>식별 번호</td>
              <td>영단어</td>
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
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, result[i].word_category, result[i].word_id)}
                  />
                </td>
                <td>{result[i].word_category}</td>
                <td>{result[i].word_id}</td>
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
          {Array.from({ length: totalPages }, (_, i) => (
          <button className="paging_number" key={i + 1} onClick={() => handlePageClick(i + 1)}>
              {i + 1}
          </button>
          ))}
      </div>
      <div className='btn_section'>
          <button className="exam_register" onClick={handleDeleteButton}>삭제하기</button>
          <button className="exam_register" onClick={() => openModal('update')}>수정하기</button>
          {renderModalContent()}
      </div>
    </div>
  );
      
};

  export default ManagementWordForm;