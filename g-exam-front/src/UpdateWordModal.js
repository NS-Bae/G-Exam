import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateWordModal = ({ modalIsOpen, closeModal, handleCheckboxChange, checkedRows, selectedLevel }) => {
    const tableHeaders = ['분류', 'Word ID', '단어', '뜻 1', '뜻 2', '뜻 3', '뜻 4', '뜻5', ''];
    const [tableData, setTableData] = useState([]);
    const [editedData, setEditedData] = useState({
      word : '', 
      word_mean1 : '',
      word_mean2 : '',
      word_mean3 : '',
      word_mean4 : '',
      word_mean5 : '',
    });
    useEffect(() => {
      // 모달이 열릴 때 데이터를 불러오기
      if (modalIsOpen) {
        fetch('/update_word', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedRows: checkedRows,
            selectedLevel: selectedLevel,
          }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTableData(data.result);
        })
        .catch((error) => {
          console.error('Error during fetch operation:', error);
        });
      }
    }, [modalIsOpen, checkedRows, selectedLevel]);
  
    const handleEditClick = (row) => {
      console.log(selectedLevel);
      const updatedData  = {
        word_id : row.word_id,
        word: editedData.word ? editedData.word : null,
        word_mean1: editedData.word_mean1 ? editedData.word_mean1 : null,
        word_mean2: editedData.word_mean2 ? editedData.word_mean2 : null,
        word_mean3: editedData.word_mean3 ? editedData.word_mean3 : null,
        word_mean4: editedData.word_mean4 ? editedData.word_mean4 : null,
        word_mean5: editedData.word_mean5 ? editedData.word_mean5 : null,
      };
      fetch('/update_word_change', {
        method : 'POST', 
        headers : {
          'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify({updatedData, selectedLevel}), 
      })
      .then((response) => {
        if(!response.ok)
        {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        alert(data.message);
      })
      .catch((error) => {
        console.error('가져오기 작업 중 오류가 발생했습니다', error);
      });
    };
  
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="단어 수정"
        className="modal_design"
      >
        <h2>단어 수정</h2>
        <div className='place'>
          <table className='third_table'>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={`${row.word_category}_${row.word_id}`}>
                  <td>{row.word_category}</td>
                  <td>{row.word_id}</td>
                  <td><textarea className='textarea_design' defaultValue={row.word} onChange={(e) => setEditedData({ ...editedData, word : e.target.value})}/></td>
                  <td><textarea className='textarea_design' defaultValue={row.word_mean1} onChange={(e) => setEditedData({ ...editedData, word_mean1 : e.target.value})}/></td>
                  <td><textarea className='textarea_design' defaultValue={row.word_mean2} onChange={(e) => setEditedData({ ...editedData, word_mean2 : e.target.value})}/></td>
                  <td><textarea className='textarea_design' defaultValue={row.word_mean3} onChange={(e) => setEditedData({ ...editedData, word_mean3 : e.target.value})}/></td>
                  <td><textarea className='textarea_design' defaultValue={row.word_mean4} onChange={(e) => setEditedData({ ...editedData, word_mean4 : e.target.value})}/></td>
                  <td><textarea className='textarea_design' defaultValue={row.word_mean5} onChange={(e) => setEditedData({ ...editedData, word_mean5 : e.target.value})}/></td>
                  <td><button className='small_letter_btn' onClick={() => handleEditClick(row)}>수정하기</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='btn_section'>
          <button onClick={closeModal} className='letter_btn'>닫기</button>
        </div>
      </Modal>
    );
  };

  export default UpdateWordModal;