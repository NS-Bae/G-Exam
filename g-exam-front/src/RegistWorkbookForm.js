import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import OcrRequest  from './OCR_Request';
import ImgPreview from './ImagePreview';

function WorkbookChoiceForm() 
{
  const [selectedExamMajor, setSelectedExamMajor] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    image: '',
    paragraph: '',
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    choice5: '',
    answer: '',
  });
  const validateForm = () => {
    const requiredFields = ['type', 'question', 'answer'];
    for (const field of requiredFields) 
    {
      if (!formData[field]) 
      {
        return false;
      }
    }
    return true;
  };
  //과목 불러오기
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
  //과목별 분류 불러오기
  useEffect(() => {
    const fatchTag = async () => {
      try {
        const response = await fetch('/get_classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form_type:"exam",
            selectedMajor: selectedExamMajor,
          }),
        });
  
        if (!response.ok) {
          throw new Error('tagList를 불러오지 못했습니다');
        }
  
        const data = await response.json();
        setTagList(data.data);
      } 
      catch (error) 
      {
        console.error(error);
      }
    };
  
    fatchTag(); // useEffect 내에서 바로 호출
  
  }, [selectedExamMajor]);

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

  const ImageUploadComponent = () => {
    const [image, setImage] = useState('');

    const handleImageChange = (e) => {
      const imageFile = e.target.files[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        Object.entries(formData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
    };
    const openImagePreview = () => {
      const imagePreviewWindow = window.open('', '_blank', 'width=600,height=400');
      const imagePreviewPage = <ImgPreview image={image} />;
      
      ReactDOM.render(imagePreviewPage, imagePreviewWindow.document.body);
    };
    
  
    return (
      <div className='upper_button_place'>
        <input type="file" id = 'image' onChange={handleImageChange} accept="image/*" className='img_input'/>
        {image && <button type='button' className='letter_btn' onClick={openImagePreview}>미리보기</button>}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    handleInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);

    if (!validateForm()) {
      alert('입력되지 않은 값이 있습니다. 모든 항목을 입력해주세요.');
      return;
    }
    const formDataObject = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value);
    });
    formDataObject.append('imagePath', formData.image);

    // 나머지 코드는 유효성 검사를 통과한 경우의 로직
    handleButton(); 

    setFormData({
      type: '',
      image: '',
      paragraph: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      choice5: '',
      answer: '',
    });
  };

  const handleButton = () => {
    fetch('/regist_workbook_exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formData, selectedExamMajor, selectedClassification}),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
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
  };

  const handleMajorListChange = (e) => {
    const selectedMajor = e.target.value;
    setSelectedExamMajor(selectedMajor);
  };

  const handleFirstConfirmButtonClick = () => {
    setConfirmButtonClicked(true);
    console.log(selectedExamMajor, selectedClassification, selectedType);
  };

  return (
    <div className='place'>
      <div className='upper_button_place'>
        <select
          id='major'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
          <option value={'select'}>선택하세요</option>
          {subjectList.map((subject) => (
            <option key={subject.major_name} value={subject.major_name}>
              {subject.major_name}
            </option>
          ))}
        </select>
        <select 
          id="classificationList"
          onChange={(e)=> setSelectedClassification(e.target.value)}
          value={selectedClassification}
        >
          <option value={'select'}>선택하세요</option>
          {tagList.map((tagOption, index) => (
            <option key={index} value={tagOption.classification_name}>
              {tagOption.classification_name}
            </option>
          ))}
        </select>
        <select id='type' value={formData.type} onChange={handleTypeChange}>
          <option value={'select'}>유형</option>
          <option value={'객관식'}>객관식</option>
          <option value={'주관식'}>주관식</option>
        </select>
        <button className='letter_btn' type='button' onClick={handleFirstConfirmButtonClick}>
          확인
        </button>
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
        <div className="choice">
            <h4>정답</h4>
            <textarea type="text" name="" id="answer" placeholder="정답" value={formData.answer} onChange={handleInputChange}></textarea>
        </div>
        </div>
    </div>
    <div className='btn_section'>
        <button type = 'submit' className="letter_btn" onClick={handleSubmit}>등록</button>
        <button type = 'button' className="letter_btn" onClick={openNewWindow}>OCR하러가기</button>
    </div>
  </div>
  );
  
  
};

export default WorkbookChoiceForm;