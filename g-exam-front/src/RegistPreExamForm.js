import './App.css';
import React from 'react';
import { useState, useRef } from 'react';

const RegistForm = () => {
  const [isConfirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isImageUploaded1, setIsImageUploaded1] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedSchooltype, setSelectedSchoolType] = useState('');
  const [selectedExamMajor, setSelectedExamMajor] = useState(''); // 기출문제용 과목 선택
  const [selectedClassification, setSelectedClassification] = useState('');
  const [image, setImage] = useState('');//이미지
  const [image1, setImage1] = useState('');//이미지1
  const [formData, setFormData] = useState({
    school_details: '',
    type: '',
    paragraph: '',
    question: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    choice5: '',
    answer: '',
    image:null,
    commentary:'',
    commentary_image:null,
  });

  const imageInputRef = useRef(null);
  const image1InputRef = useRef(null);

  const validateForm = () => {
    const requiredFields = ['school_details', 'type', 'question', 'answer'];
    for (const field of requiredFields) 
    {
      if (!formData[field]) 
      {
        return false;
      }
    }
    return true;
  };
  //과목별 분류 불러오기
  const fetchTag = async () => {
    try {
      const response = await fetch('/api/classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type:"pre_exam",
          detail: formData.school_details,
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const id = event.target.id;
    setImage(file);
    setIsImageUploaded(true);
    setFormData((prevData) => ({
      ...prevData,
      [id]: file,
    }));

    let fileRead = new FileReader();
    fileRead.onload = () => {
      setImagePreview(fileRead.result);
    }
    fileRead.readAsDataURL(file);
  };
  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    const id = event.target.id;
    setImage1(file);
    setIsImageUploaded1(true);
    setFormData((prevData) => ({
      ...prevData,
      [id]: file,
    }));

    console.log(id, file);
    
    let fileRead = new FileReader();
    fileRead.onload = function() {
      setImagePreview(fileRead.result);
    }
    fileRead.readAsDataURL(file);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  const handleCheckImage = () => {
    setIsPopupOpen(true);
  };
  const handleCheckImage1 = () => {
    setIsPopup1Open(true);
  }
  const handlePopupClose1 = () => {
    setIsPopup1Open(false);
  };

  const handleConfirmButtonClick = () =>{
    setConfirmButtonClicked(true);
    fetchTag();
  };
  const handleMajorListChange = (e) => { 
    const selectedMajor = e.target.value;
    setSelectedExamMajor(selectedMajor);
    console.log(selectedMajor);    
  };
  const handleSchoolTypeChange = (e) => {
      const selectedSchool = e.target.value;
      setSelectedSchoolType(e.target.value);
      fetch(`/api/get_school_details?school=${selectedSchool}`)
      .then((response) => response.json())
      .then((data) => {
      if (data && data.schoolDetails) {
          setSchoolsList(data.schoolDetails);
      }
      })
      .catch((error) => console.error('학교 목록 불러오기 오류:', error));
  };
  
  //등록api
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('입력되지 않은 값이 있습니다. 모든 항목을 입력해주세요.');
      return;
    };
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
      answer: '',
      image: null,
      commentary:'',
      commentary_image:null,
    });
    setImage(null);
    setImage1(null);
    setIsImageUploaded(false);
    setIsImageUploaded1(false);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (image1InputRef.current) {
      image1InputRef.current.value = '';
    }
  };
  const handleButton = () => {
    const form = new FormData();
    form.append('selectedExamMajor', selectedExamMajor);
    form.append('selectedClassification', selectedClassification);
    form.append('selectedSchool', formData.school_details);
    form.append('type', formData.type);
    form.append('paragraph', formData.paragraph);
    form.append('question', formData.question);
    form.append('choice1', formData.choice1);
    form.append('choice2', formData.choice2);
    form.append('choice3', formData.choice3);
    form.append('choice4', formData.choice4);
    form.append('choice5', formData.choice5);
    form.append('answer', formData.answer);
    form.append('commentary', formData.commentary);
    form.append('commentary_image', image1);
    form.append('image', image);

    fetch('/api/regist_pre_exam', {
        method: 'POST',
        body: form,
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

  return (
    <div className='place'>
      <div className='upper_button_place'>
        <select
          id='majorcategory'
          onChange={handleMajorListChange}
          value={selectedExamMajor}
        >
          <option value={''}>과목</option>
          <option value={'국어'}>국어</option>
          <option value={'영어'}>영어</option>
          <option value={'수학'}>수학</option>
          <option value={'사회'}>사회</option>
          <option value={'과학'}>과학</option>
          <option value={'기타'}>기타</option>
        </select>
        <div className='small_select_place'>
          <select id='school_grade' className='normal_selection' value = {selectedSchooltype} onChange={handleSchoolTypeChange}>
            <option value={'select'}>선택하세요</option>
            <option value={'초등'}>초등학교</option>
            <option value={'중등'}>중학교</option>
            <option value={'고등'}>고등학교</option>
          </select>
          <select id="school_details" className='normal_selection' value={formData.school_details} onChange={handleInputChange}>
            <option value={'select'}>선택하세요</option>
            {schoolsList.map((schoolOption, index) => (
            <option key={index} value={schoolOption.school_name}>
                {schoolOption.school_name}
            </option>
            ))}
          </select>
        </div>
        <select id='type' value={formData.type} onChange={handleInputChange}>
          <option value={'select'}>유형</option>
          <option value={'객관식'}>객관식</option>
          <option value={'주관식'}>주관식</option>
        </select>
        <button className='letter_btn' type='button' onClick={handleConfirmButtonClick}>
          확인
        </button>
      </div>
      <div className='place'>
        <select 
          className='long_selection'
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
      </div>
      <div className="question_sub">
        <div className='question_row'>
          <h4 className='question_tag'>문제 이미지</h4>
          <input id="image" type="file" accept="image/*" onChange={handleImageUpload}  className='img_input' ref={imageInputRef} />
          { isImageUploaded && <button className='small_letter_btn' onClick={handleCheckImage}>미리보기</button>}
        </div>
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <img className="popup" src={URL.createObjectURL(image)} alt="Uploaded" />
            </div>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        )}
        <div className="question_row">
          <h4 className='question_tag'>지문</h4>
          <textarea className="longtext_input" type="text" name="" id="paragraph" placeholder="지문" value={formData.paragraph} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>질문</h4>
          <textarea className="question_input" type="text" name="" id="question" placeholder="질문" value={formData.question} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>선택지1</h4>
          <textarea className="question_input" type="text" name="" id="choice1" placeholder="선택지1" value={formData.choice1} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>선택지2</h4>
          <textarea className="question_input" type="text" name="" id="choice2" placeholder="선택지2" value={formData.choice2} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>선택지3</h4>
          <textarea className="question_input" type="text" name="" id="choice3" placeholder="선택지3" value={formData.choice3} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>선택지4</h4>
          <textarea className="question_input" type="text" name="" id="choice4" placeholder="선택지4" value={formData.choice4} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>선택지5</h4>
          <textarea className="question_input" type="text" name="" id="choice5" placeholder="선택지5" value={formData.choice5} onChange={handleInputChange}></textarea>
        </div>
        <div className="question_row">
          <h4 className='question_tag'>정답</h4>
          <textarea className="question_input" type="text" name="" id="answer" placeholder="정답(숫자)" value={formData.answer} onChange={handleInputChange}></textarea>
        </div>
        <div className='question_row'>
          <h4 className='question_tag'>해설 이미지</h4>
          <input id="commentary_image" type="file" accept="image/*" onChange={handleImageUpload1} className='img_input' ref={image1InputRef} />
          { isImageUploaded1 && <button className='small_letter_btn' onClick={handleCheckImage1}>미리보기</button>}
        </div>
        {isPopup1Open && (
          <div className="popup">
            <div className="popup-content">
              <img className="popup" src={URL.createObjectURL(image1)} alt="Uploaded" />
            </div>
            <button onClick={handlePopupClose1}>Close</button>
          </div>
        )}
        <div className="question_row">
          <h4 className='question_tag'>해설</h4>
          <textarea className="longtext_input" type="text" name="" id="commentary" placeholder="해설" value={formData.commentary} onChange={handleInputChange}></textarea>
        </div>
      </div>
      <div className='btn_section'>
        <button type = 'submit' className="letter_btn" onClick={handleSubmit}>등록</button>
      </div>
    </div>
  );
};
  
export default RegistForm;