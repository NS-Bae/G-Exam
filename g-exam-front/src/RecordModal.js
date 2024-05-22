
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const RecordModal = ({ modalIsOpen, closeModal, recordInfo1, recordInfo2, recordInfo3 }) => {
  const [lines, setLines] = useState([]);
  const handleCloseButton = () =>{
    closeModal();
  }
  useEffect(() => {
    // 백엔드에서 텍스트 파일 내용을 가져온 후 lines 상태를 업데이트합니다.
    fetch('/api/read_txt_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recordInfo3 }),
    })
    .then(response => response.text())
    .then(data => {
      const trimmedText = data.trim().slice(1, -1);
      console.log(trimmedText);
      // 줄바꿈 단위로 텍스트를 분할하여 배열로 만듭니다.
      const linesArray = trimmedText.split('\\n');
      setLines(linesArray);
    })
    .catch(error => {
      console.error(error);
    });
  }, [modalIsOpen]);

  const imageNames = [];
  const imageUrls = lines.filter(line => line.startsWith('해설 이미지')).map(line => line.split(' : ')[1]);

  for(const i in imageUrls)
  {
    const decodedName = decodeURIComponent(imageUrls[i]);
    const nameParts = decodedName.split('/');
    const imageName = nameParts[nameParts.length - 1]; 
    imageNames.push(imageName);
  }

  console.log(lines);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="오답노트"
      className="modal_design"
    >
      <p>{recordInfo1}의 {recordInfo2}시험 결과</p>
      <div>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
          {line.startsWith('해설 이미지') ? (
            <>
              <img src={line.split(' : ')[1]} alt={line.split(' : ')[1]} /> 
              <br /><br />
            </>
          ) : (
            <>
              {line}
              <br />
            </>
          )}
        </React.Fragment>
        ))}
      </div>
      <div className="btn_section">
        <button onClick={handleCloseButton} className="letter_btn">닫기</button>
      </div>
    </Modal>
  );
};

export default RecordModal;