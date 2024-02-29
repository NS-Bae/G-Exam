import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const RecordModal = ({ modalIsOpen, closeModal, recordInfo1, recordInfo2, recordInfo3 }) => {
  const [result, setResult] = useState([]);
  const handleCloseButton = () =>{
    closeModal();
  }
  useEffect(() => {
    fetch('/read_txt_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordInfo3 }),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.lines);
    })
    .catch(error => {
      console.error(error);
    });
  }, [modalIsOpen]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="시험문제 수정"
      className="modal_design"
    >
      <p>{recordInfo1}의 {recordInfo2}시험 결과</p>
      <ul class="record_list">
        {result.map((item) => (
          <li>
            {item}
          </li>
        ))}
      </ul>
      <div className="btn_section">
        <button onClick={handleCloseButton} className="letter_btn">닫기</button>
      </div>
    </Modal>
  )    
};

export default RecordModal;