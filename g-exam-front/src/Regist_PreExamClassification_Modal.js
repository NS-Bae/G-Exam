import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const RegistPreExamClassificationModal = ({ modalIsOpen, closeModal, modalExamId, selectedCategory }) => {
  const [isAddButtonClicked, setAddButtonClicked] = useState(false);
  const [schoolsList, setSchoolsList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSchooltype, setSelectedSchoolType] = useState('');
  const [formData, setFormData] = useState({
    year: '',
    school_details: '',
    grade: '',
    major: '',
    semester: '',
    period: '',
    tag: '',
  });
  const validateForm = () => {
    const requiredFields = ['year', 'school_details', 'grade', 'semester', 'period'];
    for (const field of requiredFields) 
    {
      if (!formData[field]) 
      {
        return false;
      }
    }
    return true;
  };

  /* useEffect(() => {
    const fetchSubjectList = async () => {
      try 
      {
        const response = await fetch('/api/get_majorlist');
        if (!response.ok) 
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setSubjectList(data.data);
        
        console.log(data.data);
      } 
      catch (error) 
      {
        console.error('과목 리스트를 불러오는 중 오류 발생:', error);
      }
    };

    fetchSubjectList(); // useEffect가 처음 실행될 때 과목 리스트를 가져옴
  }, []); */

  const GradeSelector = ({ value, onChange, schoolType }) => {
    return (
      <div className="insert_tag">
        <h3>학년</h3>
        <select id='grade' value={value} onChange={onChange}>
          <option value="select">선택하세요</option>
          {schoolType === '초등' && (
            <>
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
              <option value="4">4학년</option>
              <option value="5">5학년</option>
              <option value="6">6학년</option>
            </>
          )}
          {(schoolType === '중등' || schoolType === '고등') && (
            <>
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </>
          )}
        </select>
      </div>
    );
  };
  const handleAddButtonClick = async () => {
    setAddButtonClicked(true);
    console.log(selectedCategory, formData);
    if (!validateForm()) {
      alert('입력되지 않은 값이 있습니다. 모든 항목을 입력해주세요.');
      return;
    }
    else
    {
      try 
      {
        const response = await fetch('/api/add_classification', {
          method : 'POST', 
          headers : {
            'Content-Type' : 'application/json',
          }, 
          body : JSON.stringify({formData, form_type:'pre_exam'}),
        });
  
        if(!response.ok)
        {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        alert(data.message);
        setFormData({
          year: '',
          school_details: '',
          grade: '',
          major: '',
          semester: '',
          period: '',
          tag: '',
        });
        setSelectedSchoolType('');

      }
      catch(error)
      {
        console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
      }
    }
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
    setSelectedSchoolType(e.target.value);
    fetch(`/api/get_school_details?school=${selectedSchool}`)
    .then((response) => response.json())
    .then((data) => {
    if (data && data.schoolDetails) 
    {
      setSchoolsList(data.schoolDetails);
    }
    })
    .catch((error) => console.error('학교 목록 불러오기 오류:', error));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="시험문제 수정"
      className="modal_design"
    >
      <h2>{modalExamId} 수정</h2>
      <div className='place'>
        <div className="upper_button_place">
          <div className="insert_tag">
            <h3>년도</h3>
            <input type="text" id = 'year' placeholder="년도" value={formData.year} onChange={handleInputChange}></input>
          </div>
          <div className="insert_tag">
            <h3>학교</h3>
            <div className='small_select_place'>
              <select id='school_grade' value = {selectedSchooltype} onChange={handleSchoolTypeChange}>
                <option value={'select'}>선택하세요</option>
                <option value={'초등'}>초등학교</option>
                <option value={'중등'}>중학교</option>
                <option value={'고등'}>고등학교</option>
              </select>
              <select id="school_details" value={formData.school_details} onChange={handleInputChange}>
                <option value={'select'}>선택하세요</option>
                {schoolsList.map((schoolOption, index) => (
                <option key={index} value={schoolOption.school_name}>
                    {schoolOption.school_name}
                </option>
                ))}
              </select>
            </div>
          </div>
          <div className='insert_tag'>
            <h3>과목</h3>
            <select
              id='major'
              onChange={handleInputChange}
              value={formData.major}
            >
              <option value={'select'}>선택하세요</option>
              <option key='국어' value='국어'>국어</option>
              <option key='영어' value='영어'>영어</option>
              <option key='수학' value='수학'>수학</option>
              <option key='사회' value='사회'>사회</option>
              <option key='과학' value='과학'>과학</option>
              <option key='기타' value='기타'>기타</option>
            </select>
          </div>
          
        </div>
        <div className='upper_button_place'>
          <GradeSelector value={formData.grade} onChange={handleInputChange} schoolType={selectedSchooltype} />
          <div className="insert_tag">
            <h3>학기</h3>
            <select id="semester" value={formData.semester} onChange={handleInputChange}>
              <option value="select">선택하세요</option>
              <option value="1">1학기</option>
              <option value="2">2학기</option>
            </select>
          </div>
          <div className="insert_tag">
            <h3>시기</h3>
            <select id="period" value={formData.period} onChange={handleInputChange}>
              <option value="select">선택하세요</option>
              <option value="중간">중간고사</option>
              <option value="기말">기말고사</option>
            </select>
          </div>
        </div>
        <p>기타인 경우 상세과목을 적어주세요.</p>
        <div className='sel_option'>
          <input type="text" name="word_tag" id="tag" value={formData.tag} onChange={handleInputChange} placeholder="분류 입력 (띄어쓰기 대신 _ 를 사용해주세요)" />
        </div>
        <div className="btn_section">
          <button onClick={closeModal} className="letter_btn">닫기</button>
          <button type='submit' className='letter_btn' onClick={handleAddButtonClick}>추가하기</button>
        </div>
      </div>
    </Modal>
  );
};

export default RegistPreExamClassificationModal;