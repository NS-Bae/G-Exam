import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const RegistKorean = () => {
    const[schoolsList, setSchoolsList] = useState([]);

    const handleSchoolTypeChange = (e) => {
        const selectedSchool = e.target.value;
        
        // 백엔드로 선택한 학교 유형을 보냅니다
        fetch(`/get_school_details?school=${selectedSchool}`)
            .then((response) => response.json())
            .then((data) => {
            if (data && data.schoolDetails) {
                setSchoolsList(data.schoolDetails);
            }
            })
            .catch((error) => console.error('학교 목록 불러오기 오류:', error));
        };

    return (
        <div className='place'>
            <div className="upper_button_place">
            <div className="insert_tag">
                <h3>학교</h3>
                <div className='small_select_place'>
                <select id='school_grade' onChange={handleSchoolTypeChange}>
                    <option value={''}>선택하세요</option>
                    <option value={'초등'}>초등학교</option>
                    <option value={'중등'}>중학교</option>
                    <option value={'고등'}>고등학교</option>
                </select>
                <select id="school_details">
                    <option value={''}>선택하세요</option>
                    {schoolsList.map((schoolOption, index) => (
                    <option key={index} value={schoolOption.school_name}>
                        {schoolOption.school_name}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            <div className="insert_tag">
                <h3>학년</h3>
                <input type="text" name="" id="grade" placeholder="학년"/>
            </div>
            <div className="insert_tag">
                <h3>과목</h3>
                <input type="text" name="" id="major" placeholder="과목"/>
            </div>
            <div className="insert_tag">
                <h3>문제유형</h3>
                <input type="text" name="" id="q_type" placeholder="주관식/객관식"/>
            </div>
            </div>
            <div className="question_sub">
                <div className="paragraph_area">
                    <h4>지문</h4>
                    <textarea type="text" name="" id="paragraph" placeholder="지문"></textarea>
                </div>
                <div className="question_area">
                    <div className="question_line">
                        <h4>질문</h4>
                        <textarea type="text" name="" id="question" placeholder="질문"></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지1</h4>
                        <textarea type="text" name="" id="choice1" placeholder="선택지1"></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지2</h4>
                        <textarea type="text" name="" id="choice2" placeholder="선택지2"></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지3</h4>
                        <textarea type="text" name="" id="choice3" placeholder="선택지3"></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지4</h4>
                        <textarea type="text" name="" id="choice4" placeholder="선택지4"></textarea>
                    </div>
                    <div className="choice">
                        <h4>선택지5</h4>
                        <textarea type="text" name="" id="choice5" placeholder="선택지5"></textarea>
                    </div>
                </div>
            </div>
            <div className='btn_section'>
                <button className="letter_btn">등록</button>
            </div>
        </div>
    );
};
  
export default RegistKorean;