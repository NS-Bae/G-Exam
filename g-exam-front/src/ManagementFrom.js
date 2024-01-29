import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UpdateExamModal from './UpdateExamModal';


const ManagementForm = ({selectedCategory}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [result, setResult] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalExamId, setModalExamId] = useState('');

  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;

    fetch('/search_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedCategory,
        offset,
        search,
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

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  const handleSearchClick = () => {
    fetchData(1);
    console.log('검색어:', search);
  };

  const handleCheckboxChange = (event, examId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, examId]);
    } else {
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((id) => id !== examId));
    }
  };

  const handleDeleteButton = () => {
    const confirmation = window.confirm('선택된 시험문제를 삭제하시겠습니까?');
    fetch('/delete_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedRows: checkedRows,
        selectedCategory: selectedCategory,
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
        alert("선택된 시험문제를 삭제하였습니다");
        fetchData(1);
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleUpdateClick = (row) => {
    openModal(row.exam_id);
  };

  const openModal = (examId) => {
    Modal.setAppElement('#root');
    setModalExamId(examId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalExamId(null);
    fetchData(1);
  };

  const renderModalContent = () => {
    return (
      <UpdateExamModal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      modalExamId={modalExamId}
      selectedCategory={selectedCategory}
      />
    );
  };

  return (
    <div className='place'>
      <p>검색조건 미입력시 전체 영단어가 조회됩니다.</p>
      <p>여러조건 입력 시 "년도_학교_과목_학년_학기_시기(중간/기말)_유형_번호" 처럼 입력해주세요</p>
      <div className='upper_button_place'>
        <input type="text" id = 'search' value={search} onChange={handleInputChange} placeholder="검색"></input>
        <button type='button' className='letter_btn' onClick={handleSearchClick}>찾기</button>
      </div>
      <div className='place'>
        <table className='third_table_exam'>
          <thead>
            <tr>
              <td>체크</td>
              <td>시험 정보</td>
              <td>학교</td>
              <td>학기</td>
              <td>버튼</td>
            </tr>
          </thead>
          <tbody>
              {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
                <tr key={result[i].exam_id}>
                  <td><input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, result[i].exam_id)}
                  /></td>
                  <td>{result[i].exam_id}</td>
                  <td>{result[i].school_list_school_name}</td>
                  <td>{result[i].semester}</td>
                  <td><button className='small_letter_btn' onClick={() => handleUpdateClick(result[i])}>수정하기</button></td>
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
          </div>
      </div>
      {renderModalContent()}
    </div>
  );
};

export default ManagementForm;