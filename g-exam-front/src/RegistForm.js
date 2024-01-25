import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import OcrRequest  from './OCR_Request';
import ImgPreview from './ImagePreview';
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';

const RegistForm = ({selectedCategory}) => {
    console.log(selectedCategory);
    const[schoolsList, setSchoolsList] = useState([]);
    const [selectedType, setSelectedType] = useState('');

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
    const validateForm = () => {
      const requiredFields = ['year', 'school_details', 'grade', 'semester', 'period', 'type', 'question'];
      for (const field of requiredFields) 
      {
        if (!formData[field]) 
        {
          return false;
        }
      }
      return true;
    };
    const handleTypeChange = (e) => {
      const value = e.target.value;
      setSelectedType(value);
      handleInputChange(e);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };
    const handleSchoolTypeChange = (e) => {
        const selectedSchool = e.target.value;
        fetch(`/get_school_details?school=${selectedSchool}`)
        .then((response) => response.json())
        .then((data) => {
        if (data && data.schoolDetails) {
            setSchoolsList(data.schoolDetails);
        }
        })
        .catch((error) => console.error('학교 목록 불러오기 오류:', error));
    };
    const ImageUploadComponent = () => {
        const [image, setImage] = useState(null);
      
        const handleImageChange = (e) => {
          const imageFile = e.target.files[0];
          if(imageFile)
          {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
          }
        };
        const openImagePreview = () => {
            const imagePreviewWindow = window.open('', '_blank', 'width=600,height=400');
            const imagePreviewPage = <ImgPreview image={image} />;
          
            imagePreviewWindow.document.write(ReactDOMServer.renderToStaticMarkup(imagePreviewPage));
        };
        
      
        return (
          <div className='upper_button_place'>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {image && <button type = 'button' className='letter_btn' onClick={openImagePreview}>미리보기</button> }
          </div>
        );
    };
    const openNewWindow = () => {
        const newWindowName = 'myNewWindow';
      
        const newWindow = window.open('', newWindowName, 'width=800,height=600');
      
        if (newWindow) {
          newWindow.document.body.innerHTML = '<div id="root"></div>';
          const rootElement = newWindow.document.getElementById('root');
      
          if (rootElement && typeof ReactDOM.createRoot === 'function') {
            const root = ReactDOM.createRoot(rootElement);
            root.render(<OcrRequest  />);
          } else {
            ReactDOM.render(<OcrRequest  />, rootElement);
          }
        } else {
          console.error('새 창을 열 수 없습니다.');
        }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!validateForm()) {
        alert('입력되지 않은 값이 있습니다. 모든 항목을 입력해주세요.');
        return;
      }
  
      // 이하 코드는 유효성 검사를 통과한 경우에만 실행
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObject.append(key, value);
      });
  
      // 나머지 코드는 유효성 검사를 통과한 경우의 로직
      for (const [key, value] of formDataObject.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // 나머지 코드는 유효성 검사를 통과한 경우의 로직
      handleButton(); 

      setFormData({
        type: '',
        paragraph: '',
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice5: '',
      });
      setSelectedType('');
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
                        <select id='type' value={formData.type} onChange={handleTypeChange}>
                          <option value={''}>선택하세요</option>
                          <option value={'객관식'}>객관식</option>
                          <option value={'주관식'}>주관식</option>
                        </select>
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
                    <button type = 'submit' className="letter_btn" onClick={handleSubmit}>등록</button>
                    <button type = 'button' className="letter_btn" onClick={openNewWindow}>OCR하러가기</button>
                </div>
            </form>
        </div>
    );
};
  
export default RegistForm;