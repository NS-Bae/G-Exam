import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateExamModal = ({ modalIsOpen, closeModal, modalExamId, selectedCategory }) => {
  const [defaultData, setDefaultData] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    year: '',
    school:'',
    grade: '',
    semester: '',
    period: '',
    type: 'select',
    paragraph: '',
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    choice5: '',
  });
  console.log('Form Data:', defaultData);

  useEffect(() => {
    if (modalIsOpen) {
      fetch('/show_exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRows: [modalExamId],
          selectedCategory: selectedCategory,
        }),
      })
        .then((response) => {
          if (!response.ok) 
          {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {/* 
          setDefaultData(data.result[0]); */
          setDefaultData({
            year: data.result[0]?.exam_id.split('_')[0] || '',
            school: data.result[0]?.exam_id.split('_')[1],
            grade: data.result[0]?.semester.split('_')[0] || '',
            semester: data.result[0]?.semester.split('_')[1] || '',
            period: data.result[0]?.semester.split('_')[2] || '',
            type: data.result[0]?.type || 'select',
            paragraph: data.result[0]?.paragraph || '',
            question: data.result[0]?.question || '',
            choice1: data.result[0]?.choice1 || '',
            choice2: data.result[0]?.choice2 || '',
            choice3: data.result[0]?.choice3 || '',
            choice4: data.result[0]?.choice4 || '',
            choice5: data.result[0]?.choice5 || '',
          });
          console.log("defaultData", defaultData);
        })
        .catch((error) => {
          console.error('Error during fetch operation:', error);
        });
    }
  }, [modalIsOpen, modalExamId, selectedCategory]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

  const updatedSchool = id === 'school' ? defaultData.school : value;

  setUpdatedData((prevData) => ({
    ...prevData,
    [id]: updatedSchool,
  }));
  };

  const handleUpdateButtonClick = () => {
    console.log('Updated Form Data:', updatedData);
    // 수정 로직 추가
  };

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="시험문제 수정"
        className="modal_design"
      >
        <h2>{modalExamId} 수정</h2>
        <div className='place'>
            <div className="upper_button_place">
                <div className="insert_tag">
                    <h3>{defaultData.year}년</h3>
                </div>
                <div className="insert_tag">
                    <h3>{defaultData.grade}학년</h3>
                </div>
                <div className="insert_tag">
                    <h3>{defaultData.semester}학기</h3>
                </div>
                <div className="insert_tag">
                    <h3>{defaultData.period}고사</h3>
                </div>
                <div className="insert_tag">
                    <h3>{defaultData.type}</h3>
                </div>
            </div>
            <div className="question_sub">
                <div className="paragraph_area">
                    <h4>지문</h4>
                    <textarea type="text" name="" id="paragraph" defaultValue={defaultData.paragraph} onChange={handleInputChange}></textarea>
                </div>
                <div className="question_area">
                    <div className="question_line">
                        <h4>질문</h4>
                        <textarea type="text" name="" id="question" defaultValue={defaultData.question} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지1</h4>
                        <textarea type="text" name="" id="choice1" defaultValue={defaultData.choice1} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지2</h4>
                        <textarea type="text" name="" id="choice2" defaultValue={defaultData.choice2} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지3</h4>
                        <textarea type="text" name="" id="choice3" defaultValue={defaultData.choice3} onChange={handleInputChange} ></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지4</h4>
                        <textarea type="text" name="" id="choice4"  defaultValue={defaultData.choice4} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지5</h4>
                        <textarea type="text" name="" id="choice5" defaultValue={defaultData.choice5} onChange={handleInputChange}></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div className="btn_section">
          <button onClick={closeModal} className="letter_btn">닫기</button>
          <button type='submit' className='letter_btn' onClick={handleUpdateButtonClick}>수정하기</button>
        </div>
      </Modal>
    );
  };

  export default UpdateExamModal;