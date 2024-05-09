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
      body: JSON.stringify({ recordInfo3 }),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [modalIsOpen]);

  const regex = /해설 이미지 : (https?:\/\/[^\s]+)/g;
  const imageUrls = [];
  let match;
  while ((match = regex.exec(result)) !== null) {
    imageUrls.push(match[1]);
  }

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
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`해설 이미지 ${index + 1}`} />
        ))}
      </ul>
      <div className="btn_section">
        <button onClick={handleCloseButton} className="letter_btn">닫기</button>
      </div>
    </Modal>
  )    
};

export default RecordModal;