import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateExamModal = ({ modalIsOpen, closeModal, modalExamId, classification, selectedCategory }) => {
  const [defaultData, setDefaultData] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    paragraph: defaultData.paragraph,
    image: defaultData.image,
    question: defaultData.question,
    choice1: defaultData.choice1,
    choice2: defaultData.choice2,
    choice3: defaultData.choice3,
    choice4: defaultData.choice4,
    choice5: defaultData.choice5,
    answer: defaultData.answer,
  });

  useEffect(() => {
    if (modalIsOpen) {
      fetch('/api/show_exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type:'pre_exam',
          selectedRows: [modalExamId],
          selectedClassification: classification,
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
      .then((data) => {
        setDefaultData({
          type: data.result[0]?.type || '',
          paragraph: data.result[0]?.paragraph || '',
          image: data.result[0]?.image || '',
          question: data.result[0]?.question || '',
          choice1: data.result[0]?.choice1 || '',
          choice2: data.result[0]?.choice2 || '',
          choice3: data.result[0]?.choice3 || '',
          choice4: data.result[0]?.choice4 || '',
          choice5: data.result[0]?.choice5 || '',
          answer: data.result[0]?.answer || '',
        });
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
      });
    }
  }, [modalIsOpen, modalExamId, selectedCategory]);
  useEffect(() => {
    setUpdatedData(defaultData);
  }, [defaultData, modalIsOpen]);

  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id]: e.target.value,
    });
  };
  const handleUpdateButtonClick = () => {
    fetch('/api/update_exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newFormData: updatedData, 
        type: 'pre_exam', 
        classification: classification,
        examId: modalExamId, 
        major: selectedCategory,
      }),
    })
    .then((response) => {
      if (!response.ok) 
      {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      setDefaultData({
        paragraph: '',
        image: '',
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice5: '',
        answer: '',
      });
      setUpdatedData({
        paragraph: '',
        image: '',
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice5: '',
        answer: '',
      });
      closeModal();
      return response.json();
    })
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error('Error during fetch operation:', error);
    });
  };
  const handleCloseButton = () => {
    setDefaultData({
      paragraph: '',
      image: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      choice5: '',
      answer: '',
    });
    setUpdatedData({
      paragraph: '',
      image: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      choice5: '',
      answer: '',
    });
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="시험문제 수정"
      className="modal_design"
    >
      <h2>{classification}</h2>
      <h2>{modalExamId}번 문제 수정</h2>
      <div className='place'>
        <div className="question_sub">
          <div className="paragraph_area">
            <h4>지문</h4>
            <textarea type="text" name="" id="paragraph" defaultValue={defaultData.paragraph}  value={updatedData.paragraph} onChange={handleInputChange}></textarea>
          </div>
          <div className="question_area">
            <div className="question_line">
              <h4>질문</h4>
              <textarea type="text" name="" id="question" defaultValue={defaultData.question} value={updatedData.question} onChange={handleInputChange}></textarea>
            </div>
            <div className="choice">
              <h4>선택지1</h4>
              <textarea type="text" name="" id="choice1" defaultValue={defaultData.choice1} value={updatedData.choice1} onChange={handleInputChange}></textarea>
            </div>
            <div className="choice">
              <h4>선택지2</h4>
              <textarea type="text" name="" id="choice2" defaultValue={defaultData.choice2} value={updatedData.choice2} onChange={handleInputChange}></textarea>
            </div>
            <div className="choice">
              <h4>선택지3</h4>
              <textarea type="text" name="" id="choice3" defaultValue={defaultData.choice3} value={updatedData.choice3} onChange={handleInputChange} ></textarea>
            </div>
            <div className="choice">
              <h4>선택지4</h4>
              <textarea type="text" name="" id="choice4" defaultValue={defaultData.choice4} value={updatedData.choice4} onChange={handleInputChange}></textarea>
            </div>
            <div className="choice">
              <h4>선택지5</h4> 
              <textarea type="text" name="" id="choice5" defaultValue={defaultData.choice5} value={updatedData.choice5} onChange={handleInputChange}></textarea>
            </div>
            <div className="choice">
              <h4>정답</h4>
              <textarea type="text" name="" id="answer" placeholder="정답" defaultValue={defaultData.answer} value={updatedData.answer} onChange={handleInputChange}></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="btn_section">
        <button onClick={handleCloseButton} className="letter_btn">닫기</button>
        <button type='submit' className='letter_btn' onClick={handleUpdateButtonClick}>수정하기</button>
      </div>
    </Modal>
  );
};

export default UpdateExamModal;