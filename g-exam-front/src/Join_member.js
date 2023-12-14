import './App.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function AuthContent({ title, children }) {
  return (
    <div className="auth_container">
      {children}
    </div>
  );
}

function Main() {
  return (
    <h1><Link to='/'>G-PLAN</Link></h1>
  );
}

function StudentJoinForm({ formType }) {
  const [id, setUsername] = useState('');
  const [pw, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const[schoolsList, setSchoolsList] = useState([]);

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

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

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!usernamePattern.test(id) || !passwordPattern.test(pw)) 
    {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      setError('사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.');
      return;
    }
    if (pw !== confirmPassword) 
    {
      const errormessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      alert(errormessage);
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const formData = {
      id,
      pw,
      grade,
      name,
      formType,
      school, 
      school_details: document.getElementById('school_details').value, // 학생 또는 교사 여부를 백엔드로 전달
    };
    
    fetch('/join_member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) 
        {
          // 회원가입이 성공한 경우
          alert(data.message); 
          window.location.href = '/login';
        } 
        else if (data.error) 
        {
          // 오류가 있는 경우
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('네트워크 오류:', error);
      });

    console.log('회원가입 시도:', id, pw, grade, formType, school);

    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setSchool('');
    setGrade('');
    setName('');
    setError('');
  };

  return (
    <AuthContent title="회원가입">
      <form onSubmit={handleJoin}>
        <div className="input_place">
          <label>아이디</label>
          <input
            id='id'
            type="text"
            value={id}
            placeholder='ID'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>비밀번호</label>
          <input
            id='pw'
            type="password"
            value={pw}
            placeholder='PASSWORD'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>비밀번호 확인</label>
          <input
            id='check_pw'
            type="password"
            value={confirmPassword}
            placeholder='PASSWORD'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>이름</label>
          <input
            id='name'
            type="name"
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>학교</label>
          <div className='select_place'>
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
        <div className="input_place">
          <label>학년</label>
          <input
            id='grade'
            type="number"
            value={grade}
            placeholder='GRADE'
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button className='test_btn' type="submit">회원가입</button>
      </form>
    </AuthContent>
  );
}

function TeacherJoinForm({ formType }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!usernamePattern.test(id) || !passwordPattern.test(pw)) 
    {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      setError('사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.');
      return;
    }
    if (pw !== confirmPassword) 
    {
      const errormessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      alert(errormessage);
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const formData = {
      id,
      pw,
      name,
      subject,
      formType,
    };
    fetch('/join_member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) 
        {
          // 회원가입이 성공한 경우
          alert(data.message); 
          window.location.href = '/login';
        } 
        else if (data.error) 
        {
          // 오류가 있는 경우
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('네트워크 오류:', error);
      });

    setId('');
    setPw('');
    setConfirmPassword('');
    setSubject('');
    setName('');
    setError('');
  };

  return (
    <AuthContent title="회원가입">
      <form onSubmit={handleJoin}>
        <div className="input_place">
          <label>아이디</label>
          <input
            id='id'
            type="text"
            value={id}
            placeholder='ID'
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>비밀번호</label>
          <input
            id='pw'
            type="password"
            value={pw}
            placeholder='PASSWORD'
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>비밀번호 확인</label>
          <input
            id='check_pw'
            type="password"
            value={confirmPassword}
            placeholder='PASSWORD'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>이름</label>
          <input
            id='name'
            type="name"
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input_place">
          <label>과목</label>
          <input
            id='subject'
            type="text"
            value={subject}
            placeholder='SUBJECT'
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <button className='test_btn' type="submit">회원가입</button>
      </form>
    </AuthContent>
  );
}

function ChangoForm()
{
  const [formType, setFormType] = useState('');
  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  return (
    <div className="input_place">
      <div className="radiobtn_place">
        <label>
          <input
            type="radio"
            value="student"
            checked={formType === 'student'}
            onChange={handleFormTypeChange}
          />
          학생용
        </label>
        <label>
          <input
            type="radio"
            value="teacher"
            checked={formType === 'teacher'}
            onChange={handleFormTypeChange}
          />
          교사용
        </label>
      </div>
      <div className="input_place">
        {formType === 'student' && (
          <StudentJoinForm formType={formType} />
        )}

        {formType === 'teacher' && (
          <TeacherJoinForm formType={formType} />
        )}
      </div>
    </div>
  );
}

function MyApp() {

  return (
    <div className="background">
      <div className="wrap">
        <Main />
        <ChangoForm />
      </div>
    </div>
  );
}
export default MyApp;
