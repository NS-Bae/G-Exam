import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
};
function ChoiceForm() {
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
      const itemsPerPage = 15; // 페이지당 아이템 수
      const offset = (page - 1) * itemsPerPage;
      fetch('/search_classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
      if(tagValue !== '')
      {
        try 
        {
          const response = await fetch('/add_classification', {
            method : 'POST', 
            headers : {
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({tagValue}),
          });
    
          if(!response.ok)
          {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          tagRef.current.value = '';
          fetchData(1);
        }
        catch(error)
        {
          console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
        }
      }
      else
      {
        alert("분류값이 입력되지 않았습니다.");
      }
    };

    const handleDeleteButtonClick = async () => {
      if (checkedRows.length > 0) 
      {
        console.log("Selected Rows for Deletion:", checkedRows);
        const confirmation = window.confirm('정말로 문제분류를 삭제하시겠습니까?');

        try 
        {
          const response = await fetch('/delete_classification', {
            method : 'POST', 
            headers : {
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({checkedRows}),
          });
    
          if(!response.ok)
          {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          fetchData(1);
          setCheckedRows([]);
        }
        catch(error)
        {
          console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
        }
      } 
      else 
      {
        alert("선택된 행이 없습니다.");
      }

      
    }

    const handleCheckboxChange = (event, id) => {
      setCheckedRows(prevRows => {
        const isChecked = event.target.checked;
        if (isChecked) 
        {
          return [...prevRows, id];
        } 
        else 
        {
          return prevRows.filter((rowId) => rowId !== id);
        }
      });
    };
  
    useEffect(() => {
      if ((isConfirmButtonClicked || !selectedCategory) && !classificationInfo.length) 
      {
        fetchData(1);
        setConfirmButtonClicked(false); 
      }
    }, [isConfirmButtonClicked, selectedCategory, classificationInfo]);
  
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
                <option value={'영단어'}>영단어</option>
                <option value={'국어'}>국어</option>
                <option value={'영어'}>영어</option>
                <option value={'수학'}>수학</option>
                <option value={'사회'}>사회</option>
                <option value={'과학'}>과학</option>
                <option value={'기타'}>기타</option>
            </select>
            <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
            확인
          </button>
        </div>
        <p>태그 입력시 과목명만 가장 앞에 입력하고 _를 사용해주세요</p>
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
                      onChange={(event) => handleCheckboxChange(event, item.classification_id)}
                      checked={checkedRows.includes(item.classification_id)}
                    />
                  </td>
                  <td>{item.classification_id}</td>
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
function ManagementClassification() 
{
  return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <ChoiceForm />
      </div>
    </div>
  );
}
export default ManagementClassification;
