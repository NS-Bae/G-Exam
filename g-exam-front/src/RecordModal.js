import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const RecordModal = ({ modalIsOpen, closeModal, recordInfo1, recordInfo2, recordInfo3 }) => {
  const [result, setResult] = useState([]);
  const handleCloseButton = () =>{
    closeModal();
  }
  useEffect(() => {
    fetch('/api/read_txt_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordInfo2 }),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [modalIsOpen]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="오답노트"
      className="modal_design"
    >
      <p>{recordInfo1}의 {recordInfo2}시험 결과</p>
      <ul class="record_list">
        <pre>{result}</pre>
      </ul>
      <div className="btn_section">
        <button onClick={handleCloseButton} className="letter_btn">닫기</button>
      </div>
    </Modal>
  )    
};

export default RecordModal;