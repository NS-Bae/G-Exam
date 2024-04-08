import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UpdateWorkbookModal from './UpdateWorkbookModal';


const ManagementWorkbookForm = ({selectedCategory}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [result, setResult] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalExamId, setModalExamId] = useState('');
  const [selectedExamMajor, setSelectedExamMajor] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');
  const [selectedClassificationName, setSelectedClassificationName] = useState('');
  const [tagList, setTagList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);


  //과목 불러오기
  useEffect(() => {
    const fetchSubjectList = async () => {
      try 
      {
        const response = await fetch('/api/get_majorlist');
        if (!response.ok) 
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setSubjectList(data.data);
      } 
      catch (error) 
      {
        console.error('과목 리스트를 불러오는 중 오류 발생:', error);
      }
    };

    fetchSubjectList(); // useEffect가 처음 실행될 때 과목 리스트를 가져옴
  }, []);
  //과목별 분류 불러오기
  useEffect(() => {
    const fatchTag = async () => {
      try {
        const response = await fetch('/api/classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form_type:"exam",
            selectedMajor: selectedExamMajor,
          }),
        });
  
        if (!response.ok) {
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
  
    fatchTag(); // useEffect 내에서 바로 호출
  
  }, [selectedExamMajor]);

  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;

    fetch('/api/search_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type:'workbook',
        selectedCategory: selectedExamMajor,
        offset,
        search: selectedClassification,
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

  const handleMajorListChange = (e) => {
    const selectedMajor = e.target.value;
    setSelectedExamMajor(selectedMajor);
  };
  const handleFirstConfirmButtonClick = () => {
    if (!selectedExamMajor || selectedExamMajor === "select") 
    {
      alert('올바른 과목을 선택하세요.');
      return;
    }
    setConfirmButtonClicked(true);
    fetchData(1);
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
          type:'workbook',
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
        fetchData(1);
        setCheckedRows([]);
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
      <UpdateWorkbookModal
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
          id='major'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
          <option value={'select'}>선택하세요</option>
          {subjectList.map((subject) => (
            <option key={subject.major_name} value={subject.major_name}>
              {subject.major_name}
            </option>
          ))}
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
        <button className='letter_btn' type='button' onClick={handleFirstConfirmButtonClick}>
          확인
        </button>
      </div>
      <div className='place'>
        <table className='third_table_exam'>
          <thead>
            <tr>
              <td>체크</td>
              <td>분류</td>
              <td>번호</td>
              <td>유형</td>
              <td>버튼</td>
            </tr>
          </thead>
          <tbody>
              {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
                <tr key={`${result[i].classification_name}_${result[i].exam_id}`}>
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

export default ManagementWorkbookForm;