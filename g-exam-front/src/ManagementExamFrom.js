import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UpdateExamModal from './UpdateExamModal';


const ManagementExamForm = ({selectedCategory}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [schoolDetail, setSchoolDetail] = useState('');
  const [modalExamId, setModalExamId] = useState('');
  const [selectedExamMajor, setSelectedExamMajor] = useState(''); // 기출문제용 과목 선택
  const [selectedClassificationName, setSelectedClassificationName] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('select');
  const [tagList, setTagList] = useState([]);
  const [result, setResult] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //
  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;

    fetch('/api/search_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'pre_exam',
        selectedCategory: selectedExamMajor,
        search: selectedClassification,
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
  //과목별 분류 불러오기
  const fetchTag = async (major) => {
    try {
      const response = await fetch('/api/get_classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type:"pre_exam",
          selectedMajor: major,
        }),
      });

      if (!response.ok)
      {
        throw new Error('tagList를 불러오지 못했습니다');
      }
      const data = await response.json();
      setTagList(data.data);
    } 
    catch (error) 
    {
      console.error(error);
    }
  };

  const handleMajorListChange = (e) => { 
    const major = e.target.value
    setSelectedExamMajor(e.target.value);
    console.log(major);
    fetchTag(major);    
  };
  const handleConfirmButtonClick = () =>{
    if (!selectedExamMajor || selectedExamMajor === "select") 
    {
      alert('올바른 과목을 선택하세요.');
      return;
    }
    setConfirmButtonClicked(true);
    fetchData(1);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };
  const handleCheckboxChange = (event, examCatgory, examId) => {
    const isChecked = event.target.checked;
    if (isChecked) 
    {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, {examCatgory, examId}]);
    } 
    else 
    {
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((row) => row.examId !== examId));
    }
  };
  const handleDeleteButton = () => {
    const confirmation = window.confirm('선택된 시험문제를 삭제하시겠습니까?');
    if(confirmation)
    {
      fetch('/api/delete_exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type:'pre_exam',
          selectedRows: checkedRows,
          selectedCategory: selectedExamMajor,
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
        setSelectedClassification('select');
        fetchData(1);
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
      });
    }
  };
  const handleUpdateClick = (row) => {
    setSelectedClassificationName(row.classification_name);
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
      classification={selectedClassificationName}
      selectedCategory={selectedExamMajor}
      />
    );
  };

  return (
    <div className='place'>
      <div className='upper_button_place'>
        <select
          id='majorcategory'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
          <option value={''}>과목</option>
          <option value={'국어'}>국어</option>
          <option value={'영어'}>영어</option>
          <option value={'수학'}>수학</option>
          <option value={'사회'}>사회</option>
          <option value={'과학'}>과학</option>
          <option value={'기타'}>기타</option>
        </select>
        <select 
          id="classificationList"
          onChange={(e)=> setSelectedClassification(e.target.value)}
          value={selectedClassification}
        >
          <option value={'select'}>선택하세요</option>
          {tagList.map((tagOption, index) => (
            <option key={index} value={tagOption.classification_name}>
              {tagOption.classification_name}
            </option>
          ))}
        </select>
        <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
          확인
        </button>
      </div>
      <div className='place'>
        
      </div>
      <div className='place'>
        <table className='third_table_exam'>
          <thead>
            <tr>
              <td>체크</td>
              <td>분류 정보</td>
              <td>문제 번호</td>
              <td>유형</td>
              <td>버튼</td>
            </tr>
          </thead>
          <tbody>
              {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
                <tr key={result[i].exam_id}>
                  <td>
                    <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, result[i].classification_name, result[i].exam_id)}
                    
                  />
                  </td>
                  <td>{result[i].classification_name}</td>
                  <td>{result[i].exam_id}</td>
                  <td>{result[i].type}</td>
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

export default ManagementExamForm;