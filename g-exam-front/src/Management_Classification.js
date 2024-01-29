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
  
    return (
      <div className = 'place'>
        <div className='upper_button_place'>
            <p>과목별로 보기</p>
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
            <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
            확인
          </button>
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
