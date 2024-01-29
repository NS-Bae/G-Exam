import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
};
function ChoiceForm() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [classificationInfo, setClassificationInfo] = useState([]);
    const [checkedRows, setCheckedRows] = useState([]);
    const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
    const [isAddButtonClicked, setAddButtonClicked] = useState(false);

    const fetchData = async () => {
      try 
      {
        const response = await fetch('/search_classification', {
          method : 'POST', 
          headers : {
            'Content-Type' : 'application/json',
          }, 
          body : JSON.stringify({selectedCategory}),
        });
  
        if(!response.ok)
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
  
        const classification_data = await response.json();
  
        setClassificationInfo(classification_data.classInfo);
      }
      catch(error)
      {
        console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
      }
    };
  
    const handleConfirmButtonClick = () => {
      setConfirmButtonClicked(true);
      console.log(selectedCategory);
      fetchData();
    };

    const handleAddButtonClick = () => {
      setAddButtonClicked(true);
      //분류추가 엔드포인트 추가.
    };

    const handleCheckboxChange = (event, id) => {
      setCheckedRows(prevRows => {
        const isChecked = event.target.checked;
        const updatedRows = isChecked
          ? [...prevRows, id]
          : prevRows.filter((rowId) => rowId !== id);
        return updatedRows;
      });
    };
  
    useEffect(() => {/* 
      fetchData(selectedCategory); */
      if (selectedCategory !== '') {
        setConfirmButtonClicked(false);
      }
    }, [selectedCategory]);
  
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
        <div className='upper_button_place'>
          <input type="text" name="word_tag" id="tag" placeholder="분류 입력 (띄어쓰기 대신 _ 를 사용해주세요)" />
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
                      onChange={(event) => handleCheckboxChange(event, item.id)}
                    />
                  </td>
                  <td>{item.classification_id}</td>
                  <td>{item.classification_name}</td>
                  <td>{item.major_name}</td>
                  <td>과목 수</td>
                </tr>
              ))}
            </tbody>
          </table>
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
