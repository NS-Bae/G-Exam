import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// AuthContent 컴포넌트 정의
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  const handleJoin = (e) => {
    e.preventDefault();

    if (!usernamePattern.test(username) || !passwordPattern.test(password)) 
    {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      setError('사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.');
      return;
    }
    if (password !== confirmPassword) 
    {
      const errormessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      alert(errormessage);
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 시도:', username, password, school, grade, formType);
/*     alert('회원가입 시도:'+ username + password + school + grade);
 */
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setSchool('');
    setGrade('');
    setError('');
  };

  return (
    <AuthContent title="회원가입"> {/* AuthContent로 감싸기 */}
      <form onSubmit={handleJoin}>
        <div className="input_place">
          <label>아이디</label>
          <input
            id='id'
            type="text"
            value={username}
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
            value={password}
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
          <label>학교</label>
          <input
            id='school'
            type="text"
            value={school}
            placeholder='SCHOOL'
            onChange={(e) => setSchool(e.target.value)}
            required
          />
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  const handleJoin = (e) => {
    e.preventDefault();

    if (!usernamePattern.test(username) || !passwordPattern.test(password)) 
    {
      const errormessage = '사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.';
      alert(errormessage);
      setError('사용자 이름과 비밀번호는 영문 대/소문자와 숫자만 허용하고 아이디의 길이는 4자에서 12자 사이, 비밀번호의 길이는 8자에서 20자 사이여야 합니다.');
      return;
    }
    if (password !== confirmPassword) 
    {
      const errormessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      alert(errormessage);
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 시도:', username, password, subject, formType);
    /* alert('회원가입 시도:'+ username + password + subject); */

    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setSubject('');
    setError('');
  };

  return (
    <AuthContent title="회원가입"> {/* AuthContent로 감싸기 */}
      <form onSubmit={handleJoin}>
        <div className="input_place">
          <label>아이디</label>
          <input
            id='id'
            type="text"
            value={username}
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
            value={password}
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
          학생용 회원가입
        </label>
        <label>
          <input
            type="radio"
            value="teacher"
            checked={formType === 'teacher'}
            onChange={handleFormTypeChange}
          />
          교사용 회원가입
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
