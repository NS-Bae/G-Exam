import './App.css';
import React from 'react';
import { useState, useRef } from 'react';
import Modal from 'react-modal';
import UpdateModal from './UpdateWordModal';

function ManagementWordForm() 
{
    const [selLevel, setSelLevel] = useState("select");
    const tagRef = useRef(null);
    const [result, setResult] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [checkedRows, setCheckedRows] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const fetchData = (page) => {
      const itemsPerPage = 15; // 페이지당 아이템 수
      const offset = (page - 1) * itemsPerPage;
      const selectedLevel = selLevel;
      const tagValue = tagRef.current ? tagRef.current.value : '';
  
      fetch('/search_table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagValue,
          selectedLevel,
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
  
    const handleConfirmButtonClick = () => {
      if (!selLevel || selLevel === "select") {
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
              selectedLevel: selLevel,
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
  
    const handleCheckboxChange = (event, wordId) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setCheckedRows((prevCheckedRows) => [...prevCheckedRows, wordId]);
      } else {
        setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((id) => id !== wordId));
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
            selectedLevel = {selLevel}
          />
        );
      }
    };
    return (
        <div className='place'>
        <div className="sel_option">
            <div className="category">
            <h3>문제 유형</h3>
            <select name="level" id="sel_level" value={selLevel} onChange={(e) => setSelLevel(e.target.value)} required>
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
            <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
            확인
            </button>
        </div>
        <p>문제태그 미입력시 전체 영단어가 조회됩니다.</p>
        <table className='third_table'>
            <thead>
            <tr>
                <td>체크</td>
                <td>식별 번호</td>
                <td>영단어</td>
                <td>뜻1</td>
                <td>뜻2</td>
                <td>뜻3</td>
                <td>뜻4</td>
            </tr>
            </thead>
            <tbody>
            {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
                <tr key={result[i].word_id}>
                <td><input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, result[i].word_id)}
                /></td>
                <td>{result[i].word_id}</td>
                <td>{result[i].word}</td>
                <td>{result[i].word_mean1}</td>
                <td>{result[i].word_mean2}</td>
                <td>{result[i].word_mean3}</td>
                <td>{result[i].word_mean4}</td>
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