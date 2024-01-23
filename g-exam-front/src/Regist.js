import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import RegistKorean from './RegistKorean.js'

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function ChoiceForm() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedManagement, setSelectedManagement] = useState('');
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [isChoiceFormVisible, setChoiceFormVisible] = useState(true);

  const handleConfirmButtonClick = () => {
    setConfirmButtonClicked(true);
  };
  const handleConfirmButtonClick2 = () => {
    setChoiceFormVisible(false);
  }
  const handleFormBackClick = () => {
    setSelectedCategory('');
    setSelectedManagement('');
    setConfirmButtonClicked(false);
    setChoiceFormVisible(true);
  };
  
  useEffect(() => {
    if (selectedManagement !== '') {
      setConfirmButtonClicked(false);
    }
  }, [selectedManagement]);

  useEffect(() => {
    if (selectedCategory !== '') {
      setConfirmButtonClicked(false);
    }
  }, [selectedCategory]);

  const renderForm = () => {
    if (selectedManagement === '등록') {
      return (
        <RegistForm
          selectedCategory={selectedCategory}
          selectedManagement={selectedManagement}
          onChangeFormBackClick={handleFormBackClick}
        />
      );
    } else if (selectedManagement === '관리') {
      return (
        <ManagementForm
          selectedCategory={selectedCategory}
          selectedManagement={selectedManagement}
          onChangeFormBackClick={handleFormBackClick}
          onChangeFormClick={handleConfirmButtonClick2}
        />
      );
    }
    setConfirmButtonClicked(false);
    return null;
  };
  return (
    <div className = 'place'>
      {isChoiceFormVisible && (
        <div className='upper_button_place'>
          <select
            id='category'
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
              <option value={''}>선택하세요</option>
              <option value={'영단어'}>영단어</option>
              <option value={'국어'}>국어</option>
              <option value={'영어'}>영어</option>
              <option value={'수학'}>수학</option>
              <option value={'사회'}>사회</option>
              <option value={'과학'}>과학</option>
              <option value={'기타'}>기타</option>
          </select>
          <select
            id='management'
            onChange={(e) => setSelectedManagement(e.target.value)}
            value={selectedManagement}
          >
              <option value={''}>선택하세요</option>
              <option value={'등록'}>등록하기</option>
              <option value={'관리'}>관리하기</option>
          </select>
          <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
            확인
          </button>
        </div>
      )}
      {isConfirmButtonClicked && renderForm()}
    </div>
  );
}
function RegistForm ({ selectedCategory, selectedManagement, onChangeFormBackClick })
{
  const qRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const aRefs = Array.from({ length: 10 }, (_, i) => React.createRef());
  const selLevelRef = useRef(null);
  const tagRef = useRef(null);

  const handleBackButtonClick =() => {
    onChangeFormBackClick();
  }

  const handleConfirmButtonClick = () => {
    const wordTag = tagRef.current.value;
    const selectedLevel = selLevelRef.current.value;

    if (!wordTag || !selectedLevel || selectedLevel === "select") {
      console.log('wordTag or selectedLevel is null, undefined, or "select". Skipping the request.');
      alert('올바른 단어 태그와 레벨을 선택하세요.');
      return;
    }
    
    const wordSave = Array.from ({ length : 10 }, (_, i) => {
      const engWord = qRefs[i].current.value;
      const korWord = aRefs[i].current.value;
  
      const korWordArray = korWord.split('/');

      qRefs[i].current.value = '';
      aRefs[i].current.value = '';

      return { engWord, korWord : korWordArray};
    });

    const validWordSave = wordSave.filter(
      item => item.engWord.trim() !== '' && item.korWord.length > 0
      );

    fetch('/save_eng_word', {
      method : 'POST', 
      headers: {
        'Content-Type' : 'application/json',
      }, 
      body : JSON.stringify({
        selectedCategory,
        selectedManagement,
        wordSave: validWordSave,
        wordTag, 
        selectedLevel,
      }),
    })
    .then(response => {
      if(!response.ok)
      {
        throw new Error('네트워크의 응답이 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
    })
  }
  if(selectedManagement === '등록')
  {
    if(selectedCategory === '영단어')
    {
      return (
        <div className = 'place'>
          <div className="sel_option">
            <div className="category">
                <h3>문제 유형</h3>
                <select name="level" id="sel_level" ref={selLevelRef} required >
                    <option value="select">선택하세요</option>
                    <option value="elementary">초등</option>
                    <option value="middle">중등</option>
                    <option value="high">고등</option>
                    <option value="toeic">토익</option>
                </select>
            </div>
            <div className="word_tag">
                <h3>문제 태그</h3>
                <input type="text" name="word_tag" id="tag" ref={tagRef} placeholder="영단어 정보" />
            </div>
          </div>
          <p>영단어의 뜻을 입력할 때 뜻과 뜻 사이에 "/"로 구분해주세요(최대 4개)</p>
          <table className='third_table'>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i}>
                  <td><textarea className="answer_box" ref={qRefs[i]} placeholder="EN_WORD"></textarea></td>
                  <td><textarea className="answer_box" ref={aRefs[i]} placeholder="KO_WORD"></textarea></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='btn_section'>
            <button className='letter_btn' type='submit' onClick= {handleConfirmButtonClick}>
                등록하기
            </button>
            <button className="exam_register" onClick={handleBackButtonClick}>뒤로가기</button>
          </div>
        </div>
      );
    }
    else if(selectedCategory === '국어')
    {
      return <RegistKorean />;
    }
    else if(selectedCategory === '영어')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '수학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '사회')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '과학')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
    else if(selectedCategory === '기타')
    {
      return (
        <div>
          <p>{selectedCategory} {selectedManagement}</p>
        </div>
      );
    }
  }
  else
  {
    return (
      <p>선택해주세요!</p>
    );
  }
    
};
function ManagementForm({ selectedCategory, selectedManagement, onChangeFormClick, onChangeFormBackClick }) {
  const [selLevel, setSelLevel] = useState("select");
  const tagRef = useRef(null);
  const [result, setResult] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selOptionHidden, setSelOptionHidden] = useState(false);
  const [tableButtonHidden, setTableButtonHidden] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchData = (page) => {
    const itemsPerPage = 15; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;
    const selectedLevel = selLevel;
    const tagValue = tagRef.current ? tagRef.current.value : '';

    fetch('/search_table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedCategory,
        tagValue,
        selectedLevel,
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

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleConfirmButtonClick = () => {
    if (!selLevel || selLevel === "select") {
      console.log('tagValue or selectedLevel is null, undefined, or "select". Skipping the request.');
      alert('올바른 단어 태그와 레벨을 선택하세요.');
      return;
    }
    fetchData(1);
    onChangeFormClick();
  };
  // 뒤로가기
  const handleBackButtonClick = () => {
    onChangeFormBackClick();
    setSelOptionHidden(!selOptionHidden);
    setTableButtonHidden(!tableButtonHidden);
  };
  // 삭제기능
  const handleDeleteButton = () => {
    console.log("삭제Checked Rows:", checkedRows, selLevel);
    const confirmation = window.confirm('정말로 영단어를 삭제하시겠습니까?');
    fetch('/delete_word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedRows: checkedRows,
        selectedLevel: selLevel,
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
        alert("영단어를 삭제하였습니다");
        fetchData(1);
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
      });
  };

  const openModal = async (type) => {
    Modal.setAppElement('#root');
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
    fetchData(1);
  };

  const handleCheckboxChange = (event, wordId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, wordId]);
    } else {
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((id) => id !== wordId));
    }
  };

  const renderModalContent = () => {
    if (modalType === 'update') {
      return (
        <UpdateModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleCheckboxChange={handleCheckboxChange}
          checkedRows={checkedRows}
          selectedLevel = {selLevel}
        />
      );
    }
  };

  if (selectedManagement === '관리') {
    if (selectedCategory === '영단어') {
      return (
        <div className='place'>
          <div className="sel_option">
            <div className="category">
              <h3>문제 유형</h3>
              <select name="level" id="sel_level" value={selLevel} onChange={(e) => setSelLevel(e.target.value)} required>
                <option value="select">선택하세요</option>
                <option value="elementary">초등</option>
                <option value="middle">중등</option>
                <option value="high">고등</option>
                <option value="toeic">토익</option>
              </select>
            </div>
            <div className="word_tag">
              <h3>문제 태그</h3>
              <input type="text" name="word_tag" id="tag" ref={tagRef} placeholder="영단어 정보" />
            </div>
            <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
              확인
            </button>
          </div>
          <p>문제태그 미입력시 전체 영단어가 조회됩니다.</p>
          <table className='third_table'>
            <thead>
              <tr>
                <td>체크</td>
                <td>식별 번호</td>
                <td>영단어</td>
                <td>뜻1</td>
                <td>뜻2</td>
                <td>뜻3</td>
                <td>뜻4</td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(result.length, 15) }, (_, i) => (
                <tr key={result[i].word_id}>
                  <td><input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, result[i].word_id)}
                  /></td>
                  <td>{result[i].word_id}</td>
                  <td>{result[i].word}</td>
                  <td>{result[i].word_mean1}</td>
                  <td>{result[i].word_mean2}</td>
                  <td>{result[i].word_mean3}</td>
                  <td>{result[i].word_mean4}</td>
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
            <button className="exam_register" onClick={() => openModal('update')}>수정하기</button>
            <button className="exam_register" onClick={handleBackButtonClick}>뒤로가기</button>
            {renderModalContent()}
          </div>
        </div>
      );
    }
  } else {
    return (
      <p>선택해주세요!</p>
    );
  }
}
const UpdateModal = ({ modalIsOpen, closeModal, handleCheckboxChange, checkedRows, selectedLevel }) => {
  const tableHeaders = ['Word ID', '영단어', '뜻 1', '뜻 2', '뜻 3', '뜻 4', ''];
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState({
    word : '', 
    word_mean1 : '',
    word_mean2 : '',
    word_mean3 : '',
    word_mean4 : '',

  })

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
      contentLabel="영단어 수정"
      className="modal_design"
    >
      <h2>영단어 수정</h2>
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
              <tr key={rowIndex}>
                <td>{row.word_id}</td>
                <td><textarea className='textarea_design' defaultValue={row.word} onChange={(e) => setEditedData({ ...editedData, word : e.target.value})}/></td>
                <td><textarea className='textarea_design' defaultValue={row.word_mean1} onChange={(e) => setEditedData({ ...editedData, word_mean1 : e.target.value})}/></td>
                <td><textarea className='textarea_design' defaultValue={row.word_mean2} onChange={(e) => setEditedData({ ...editedData, word_mean2 : e.target.value})}/></td>
                <td><textarea className='textarea_design' defaultValue={row.word_mean3} onChange={(e) => setEditedData({ ...editedData, word_mean3 : e.target.value})}/></td>
                <td><textarea className='textarea_design' defaultValue={row.word_mean4} onChange={(e) => setEditedData({ ...editedData, word_mean4 : e.target.value})}/></td>
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
function MyApp() 
{
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('/profile')
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP 오류 ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error('세션 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);
    if(user.user_type !== "선생")
    {
        return (
            <div className = "background">
              <div className = "wrap">
                <Main/>
                <p>교사용 페이지입니다.</p>
              </div>
            </div>
          );
    }
    else
    {
        return (
            <div className = "background">
              <div className = "wrap">
                <Main/>
                <ChoiceForm/>
              </div>
            </div>
          );
    }
};

export default MyApp;


