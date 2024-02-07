import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import RegistPreExamClassificationModal from './Regist_PreExamClassification_Modal';

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
};
function ChoiceForm1()
{
  const [selectedCategory, setSelelctedCategory] = useState('');

  const renderSecondChoice = () => {
    if(selectedCategory === 'exam')
    {
      return (<ExamForm form_type = {selectedCategory}/>)
    }
    else if(selectedCategory === 'word')
    {
      return (<WordForm form_type = {selectedCategory}/>)
    }
    else if(selectedCategory === 'pre_exam')
    {
      return(<PreExamForm form_type = {selectedCategory} />)
    }
    else
    {
      return null;
    }
  };
  return (
    <div className='place'>
      <div className='upper_button_place'>
        <select name="level" id="sel_level" value={selectedCategory} onChange={(e) => setSelelctedCategory(e.target.value)} required>
          <option value="select">선택하세요</option>
          <option value="pre_exam">기출시험 분류</option>
          <option value="exam">시험 분류</option>
          <option value="word">단어 분류</option>
        </select>
      </div>
      {(renderSecondChoice())}
    </div>
  );
}
function ExamForm({form_type}) 
{
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [classificationInfo, setClassificationInfo] = useState([]);
    const [checkedRows, setCheckedRows] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
    const [isAddButtonClicked, setAddButtonClicked] = useState(false);
    const tagRef = useRef(null);

    const fetchData = (page) => {
      const itemsPerPage = 15; 
      const offset = (page - 1) * itemsPerPage;

      fetch('/search_classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type,
          selectedCategory,
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
          setClassificationInfo(data.data);
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
      setConfirmButtonClicked(true);
      fetchData(1);
    };

    const handleAddButtonClick = async () => {
      const tagValue = tagRef.current ? tagRef.current.value : '';
      setAddButtonClicked(true);
      console.log(selectedCategory);
      if(selectedCategory === "select" || tagValue === '')
      {
        alert("분류값이 입력되지 않았거나 선택된 과목이 올바르지 않습니다.");
      }
      else
      {
        try 
        {
          const response = await fetch('/add_classification', {
            method : 'POST', 
            headers : {
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({tagValue, selectedCategory, form_type}),
          });
    
          if(!response.ok)
          {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          const data = await response.json();
          alert(data.message);
          tagRef.current.value = '';
          fetchData(1);
        }
        catch(error)
        {
          console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
        }
      }
    };

    const handleDeleteButtonClick = async () => {
      if (checkedRows.length > 0) 
      {
        const confirmation = window.confirm('정말로 문제분류를 삭제하시겠습니까?');
        
        if(confirmation)
        {
          try 
          {
            const response = await fetch('/delete_classification', {
              method : 'POST', 
              headers : {
                'Content-Type' : 'application/json',
              }, 
              body : JSON.stringify({checkedRows, form_type}),
            });
      
            if(!response.ok)
            {
              throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            const data = await response.json();
            alert(data.message);
            fetchData(1);
            setCheckedRows([]);
          }
          catch(error)
          {
            console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
          }
        }
      } 
      else 
      {
        alert("선택된 행이 없습니다.");
      }

      
    };

    const handleCheckboxChange = (event, classificationName) => {
      setCheckedRows(prevRows => {
        const isChecked = event.target.checked;
        if (isChecked) 
        {
          return [...prevRows, classificationName];
        } 
        else 
        {
          return prevRows.filter((name) => name !== classificationName);
        }
      });
      console.log(checkedRows);
    };
  
    useEffect(() => {
      fetchData(1);
    }, [])

    useEffect(() => {
      const fetchSubjectList = async () => {
        try 
        {
          const response = await fetch('/get_majorlist');
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
  
    return (
      <div className = 'place'>
        <div className='upper_button_place'>
            <p>과목별로 보기</p>
            <select
              id='category'
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value={'select'}>선택하세요</option>
              {subjectList.map((subject) => (
                <option key={subject.major_name} value={subject.major_name}>
                  {subject.major_name}
                </option>
              ))}
            </select>
            <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
            확인
          </button>
        </div>
        <p>태그 입력시 과목명은 상단에서 선택하고 띄어쓰기 대신 _를 사용해주세요</p>
        <div className='sel_option'>
          <input type="text" name="word_tag" id="tag" ref={tagRef} placeholder="분류 입력 (띄어쓰기 대신 _ 를 사용해주세요)" />
          <button className='letter_btn' type='button' onClick={handleAddButtonClick}>
            추가하기
          </button>
        </div>
        <div className='place'>
          <table className='third_table'>
            <thead>
              <tr>
                <th>체크</th>
                <th>분류 번호</th>
                <th>분류명</th>
                <th>과목</th>
                <th>문제 수</th>
              </tr>
            </thead>
            <tbody>
              {classificationInfo.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(event) => handleCheckboxChange(event, item.classification_name)}
                      checked={checkedRows.includes(item.classification_name)}
                    />
                  </td>
                  <td>{index+1}</td>
                  <td>{item.classification_name}</td>
                  <td>{item.major_name}</td>
                  <td>{item.workbook_count}</td>
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
        </div>
        <div className='upper_button_place'>
          <button className='letter_btn' onClick={handleDeleteButtonClick} disabled={checkedRows.length === 0}>분류 삭제</button>
        </div>
      </div>
    );
}
function PreExamForm({form_type}) 
{
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [classificationInfo, setClassificationInfo] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fetchData = (page) => {
    const itemsPerPage = 15; 
    const offset = (page - 1) * itemsPerPage;

    fetch('/search_classification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form_type,
        selectedCategory,
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
        setClassificationInfo(data.data);
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
    setConfirmButtonClicked(true);
    fetchData(1);
  };

  const handleAddButtonClick = () => {
    openModal();
  };

  const handleDeleteButtonClick = async () => {
    if (checkedRows.length > 0) 
    {
      const confirmation = window.confirm('정말로 문제분류를 삭제하시겠습니까?');
      
      if(confirmation)
      {
        try 
        {
          const response = await fetch('/delete_classification', {
            method : 'POST', 
            headers : {
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({checkedRows, form_type}),
          });
    
          if(!response.ok)
          {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          const data = await response.json();
          alert(data.message);
          fetchData(1);
          setCheckedRows([]);
        }
        catch(error)
        {
          console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
        }
      }
    } 
    else 
    {
      alert("선택된 행이 없습니다.");
    }

    
  };

  const handleCheckboxChange = (event, classificationName) => {
    setCheckedRows(prevRows => {
      const isChecked = event.target.checked;
      if (isChecked) 
      {
        return [...prevRows, classificationName];
      } 
      else 
      {
        return prevRows.filter((name) => name !== classificationName);
      }
    });
    console.log(checkedRows);
  };

  useEffect(() => {
    fetchData(1);
  }, [])

  useEffect(() => {
    const fetchSubjectList = async () => {
      try 
      {
        const response = await fetch('/get_majorlist');
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

  const openModal = () => {
    Modal.setAppElement('#root');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchData(1);
  };

  const renderModalContent = () => {
    return (
      <RegistPreExamClassificationModal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      />
    );
  };

  return (
    <div className = 'place'>
      <div className='upper_button_place'>
          <p>과목별로 보기</p>
          <select
            id='category'
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value={'select'}>선택하세요</option>
            {subjectList.map((subject) => (
              <option key={subject.major_name} value={subject.major_name}>
                {subject.major_name}
              </option>
            ))}
          </select>
          <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
          확인
        </button>
      </div>      
      <div className='place'>
        <table className='third_table'>
          <thead>
            <tr>
              <th>체크</th>
              <th>분류 번호</th>
              <th>분류명</th>
              <th>과목</th>
              <th>문제 수</th>
            </tr>
          </thead>
          <tbody>
            {classificationInfo.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, item.classification_name)}
                    checked={checkedRows.includes(item.classification_name)}
                  />
                </td>
                <td>{index+1}</td>
                <td>{item.classification_name}</td>
                <td>{item.major_name}</td>
                <td>{item.workbook_count}</td>
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
      </div>
      <div className='upper_button_place'>
        <button className='letter_btn' onClick={handleDeleteButtonClick} disabled={checkedRows.length === 0}>분류 삭제</button>
        <button className='letter_btn' type='button' onClick={handleAddButtonClick}>
          분류 추가
        </button>
        {renderModalContent()}
      </div>
    </div>
  );
}
function WordForm({form_type})
{
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [classificationInfo, setClassificationInfo] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [isAddButtonClicked, setAddButtonClicked] = useState(false);
  const tagRef = useRef(null);

  const fetchData = (page) => {
    const itemsPerPage = 15; 
    const offset = (page - 1) * itemsPerPage;

    fetch('/search_classification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form_type,
        selectedCategory,
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
        setClassificationInfo(data.data);
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
    setConfirmButtonClicked(true);
    fetchData(1);
  };

  const handleAddButtonClick = async () => {
    const tagValue = tagRef.current ? tagRef.current.value : '';
    setAddButtonClicked(true);
    console.log(selectedCategory);
    if(selectedCategory === "select" || tagValue === '')
    {
      alert("분류값이 입력되지 않았거나 선택된 과목이 올바르지 않습니다.");
    }
    else
    {
      try 
      {
        const response = await fetch('/add_classification', {
          method : 'POST', 
          headers : {
            'Content-Type' : 'application/json',
          }, 
          body : JSON.stringify({tagValue, selectedCategory, form_type}),
        });
  
        if(!response.ok)
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        alert(data.message);
        tagRef.current.value = '';
        fetchData(1);
      }
      catch(error)
      {
        console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
      }
    }
  };

  const handleDeleteButtonClick = async () => {
    if (checkedRows.length > 0) 
    {
      const confirmation = window.confirm('정말로 문제분류를 삭제하시겠습니까?');
      
      if(confirmation)
      {
        try 
        {
          const response = await fetch('/delete_classification', {
            method : 'POST', 
            headers : {
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({checkedRows, form_type}),
          });
    
          if(!response.ok)
          {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          const data = await response.json();
          alert(data.message);
          fetchData(1);
          setCheckedRows([]);
        }
        catch(error)
        {
          console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
        }
      }
    } 
    else 
    {
      alert("선택된 행이 없습니다.");
    }

    
  };

  const handleCheckboxChange = (event, wordCategory) => {
    setCheckedRows(prevRows => {
      const isChecked = event.target.checked;
      if (isChecked) 
      {
        return [...prevRows, wordCategory];
      } 
      else 
      {
        return prevRows.filter((category) => category !== wordCategory);
      }
    });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className = 'place'>
      <div className='upper_button_place'>
          <p>단어 대분류 선택</p>
          <select name="level" id="sel_level" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
            <option value="select">선택하세요</option>
            <option value="국어">국어</option>
            <option value="한문">한문</option>
            <option value="영어">영어</option>
            <option value="역사">역사</option>
            <option value="과학">과학</option>
            <option value="기타">기타</option>
          </select>
          <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
          확인
        </button>
      </div>
      <p>태그 입력시 과목명은 상단에서 선택하고 띄어쓰기 대신 _를 사용해주세요</p>
      <div className='sel_option'>
        <input type="text" name="word_tag" id="tag" ref={tagRef} placeholder="분류 입력 (띄어쓰기 대신 _ 를 사용해주세요)" />
        <button className='letter_btn' type='button' onClick={handleAddButtonClick}>
          추가하기
        </button>
      </div>
      <div className='place'>
        <table className='third_table'>
          <thead>
            <tr>
              <th>체크</th>
              <th>분류 번호</th>
              <th>분류명</th>
              <th>과목</th>
              <th>문제 수</th>
            </tr>
          </thead>
          <tbody>
            {classificationInfo.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, item.word_category)}
                    checked={checkedRows.includes(item.word_category)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.word_category}</td>
                <td>{item.major_name}</td>
                <td>{item.word_count}</td>
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
      </div>
      <div className='upper_button_place'>
        <button className='letter_btn' onClick={handleDeleteButtonClick} disabled={checkedRows.length === 0}>분류 삭제</button>
      </div>
    </div>
  );
}
function ManagementClassification() 
{
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <ChoiceForm1 />
      </div>
    </div>
  );
}
export default ManagementClassification;
