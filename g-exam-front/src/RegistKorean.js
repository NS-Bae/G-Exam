import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import OCR_Request from './OCR_Request';

const RegistKorean = ({selectedCategory}) => {
    console.log(selectedCategory);
    const[schoolsList, setSchoolsList] = useState([]);
    const [formData, setFormData] = useState({
        year: '',
        school_details: '',
        grade: '',
        selectedCategory,
        semester: '',
        period: '',
        type: '',
        paragraph: '',
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice5: '',
    });
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };
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
    const ImageUploadComponent = ({ onImageUpload }) => {
        const [image, setImage] = useState(null);
      
        const handleImageChange = (e) => {
          const selectedImage = e.target.files[0];
          setImage(selectedImage);
        };
      
        const handleUpload = () => {
          // 이미지를 업로드하는 함수 호출
          onImageUpload(image);
        };
      
        return (
          <div className='upper_button_place'>
            <input type="file" onChange={handleImageChange} />
          </div>
        );
    };
    const openNewWindow = () => {
        // 아무 문자열이나 사용 가능한 새 창의 이름
        const newWindowName = 'myNewWindow';
    
        // 새 창 열기
        const newWindow = window.open('', newWindowName, 'width=800,height=600');
    
        if (newWindow) {
          newWindow.document.body.innerHTML = '<div id="root"></div>';
          ReactDOM.render(<OCR_Request/>, newWindow.document.getElementById('root'));
        } else {
          console.error('새 창을 열 수 없습니다.');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObject.append(key, value);
        });
    
        for (const [key, value] of formDataObject.entries()) {
          console.log(`${key}: ${value}`);
        }
    
        alert('폼데이터가 콘솔에 출력되었습니다. 추가 작업을 수행하세요.');
    };
    const handleButton = () => {
        fetch('/regist_pre_exam', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({formData}),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message) 
              {
                alert(data.message);
              } 
              else if (data.error) 
              {
                alert(data.error);
              }
            })
            .catch((error) => {
              console.error('네트워크 오류:', error);
            });
    }

    return (
        <div className='place'>
            <form onSubmit={handleSubmit}>
                <div className="upper_button_place">
                    <div className="insert_tag">
                        <h3>년도</h3>
                        <input type="text" id = 'year' placeholder="년도" value={formData.year} onChange={handleInputChange}></input>
                    </div>
                    <div className="insert_tag">
                        <h3>학교</h3>
                        <div className='small_select_place'>
                            <select id='school_grade' onChange={handleSchoolTypeChange}>
                                <option value={''}>선택하세요</option>
                                <option value={'초등'}>초등학교</option>
                                <option value={'중등'}>중학교</option>
                                <option value={'고등'}>고등학교</option>
                            </select>
                            <select id="school_details" value={formData.schoolDetails} onChange={handleInputChange}>
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
                        <input type="text" id = 'grade' placeholder="학년" value={formData.grade} onChange={handleInputChange}></input>
                    </div>
                    <div className="insert_tag">
                        <h3>학기</h3>
                        <input type="text" id = 'semester' placeholder="학기" value={formData.semester} onChange={handleInputChange}></input>
                    </div>
                    <div className="insert_tag">
                        <h3>시기</h3>
                        <input type="text" id = 'period' placeholder="시기" value={formData.period} onChange={handleInputChange}></input>
                    </div>
                    <div className="insert_tag">
                        <h3>유형</h3>
                        <input type="text" id = 'type' placeholder="유형" value={formData.type} onChange={handleInputChange}></input>
                    </div>
                </div>
                <ImageUploadComponent />
                <div className="question_sub">
                    <div className="paragraph_area">
                        <h4>지문</h4>
                        <textarea type="text" name="" id="paragraph" placeholder="지문" value={formData.paragraph} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="question_area">
                        <div className="question_line">
                            <h4>질문</h4>
                            <textarea type="text" name="" id="question" placeholder="질문" value={formData.question} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="choice">
                            <h4>선택지1</h4>
                            <textarea type="text" name="" id="choice1" placeholder="선택지1" value={formData.choice1} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="choice">
                            <h4>선택지2</h4>
                            <textarea type="text" name="" id="choice2" placeholder="선택지2" value={formData.choice2} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="choice">
                            <h4>선택지3</h4>
                            <textarea type="text" name="" id="choice3" placeholder="선택지3" value={formData.choice3} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="choice">
                            <h4>선택지4</h4>
                            <textarea type="text" name="" id="choice4" placeholder="선택지4" value={formData.choice4} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="choice">
                            <h4>선택지5</h4>
                            <textarea type="text" name="" id="choice5" placeholder="선택지5" value={formData.choice5} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className='btn_section'>
                    <button type = 'submit' className="letter_btn" onClick={handleButton}>등록</button>
                    <button className="letter_btn" onClick={openNewWindow}>OCR하러가기</button>
                </div>
            </form>
        </div>
    );
};
  
export default RegistKorean;