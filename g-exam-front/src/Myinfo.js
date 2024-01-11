import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
const UserInfoTable = ({ user }) => {
  if(user.user_type === '학생')
  {
    return (
      <table className='info_table'>
        <tbody>
          <tr>
            <td>사용자 ID</td>
            <td> : </td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>사용자 이름</td>
            <td> : </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>사용자 분류</td>
            <td> : </td>
            <td>{user.user_type}</td>
          </tr>
          <tr>
            <td>사용자 학교</td>
            <td> : </td>
            <td>{user.school_list_school_name}</td>
          </tr>
          <tr>
            <td>사용자 학년</td>
            <td> : </td>
            <td>{user.grade}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  else if(user.user_type === '선생')
  {
    return (
      <table className='info_table'>
        <tbody>
          <tr>
            <td>사용자 ID</td>
            <td> : </td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>사용자 이름</td>
            <td> : </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>사용자 분류</td>
            <td> : </td>
            <td>{user.user_type}</td>
          </tr>
          <tr>
            <td>강의 과목</td>
            <td> : </td>
            <td>{user.major_list_major_name}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};
const ApprovalModal = ({ modalIsOpen, closeModal, studentInfo, handleCheckboxChange, handleUpdateCheckedRows, isUpdateButtonDisabled }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="회원가입 승인"
    >
      <h2>회원가입 승인</h2>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>아이디</th>
            <th>비번</th>
            <th>이름</th>
            <th>학교, 학년</th>
            <th>승인 여부</th>
          </tr>
        </thead>
        <tbody>
          {studentInfo.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.pw}</td>
              <td>{item.name}</td>
              <td>{item.school_list_school_name} {item.grade}학년</td>
              <td>{item.ready === 1 ? '승인' : '미승인'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleUpdateCheckedRows}
        disabled={isUpdateButtonDisabled}
      >
        선택한 로우 업데이트
      </button>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};
const DeleteModal = ({ modalIsOpen, closeModal, studentInfo, handleCheckboxChange, handleUpdateCheckedRows, isUpdateButtonDisabled }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="회원 삭제"
    >
      <h2>회원 삭제</h2>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>아이디</th>
            <th>비번</th>
            <th>이름</th>
            <th>학교, 학년</th>
          </tr>
        </thead>
        <tbody>
          {studentInfo.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                />
              </td>
              <td>{item.id}</td>
              <td>{item.pw}</td>
              <td>{item.name}</td>
              <td>{item.school_list_school_name} {item.grade}학년</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleUpdateCheckedRows}
        disabled={isUpdateButtonDisabled}
      >
        회원 삭제
      </button>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};
function TeacherBtn()
{
  Modal.setAppElement('#root');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [isUpdateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [modalType, setModalType] = useState(null);

  const fetchData = async (modalType) => {
    console.log(modalType);
    try 
    {
      let endpoint = '';

      if(modalType === 'approval')
      {
        endpoint = '/change_state';
      }
      else if(modalType === 'delete')
      {
        endpoint = '/change_state_delete';
      }

      const response = await fetch(endpoint, {
        method : 'POST', 
        headers : {
          'Content-Type' : 'application/json',
        }, 
        body : JSON.stringify(),
      });

      if(!response.ok)
      {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }

      const student_data = await response.json();

      setStudentInfo(student_data.studentInfo);
    }
    catch(error)
    {
      console.log("데이터를 가져오는 과정에서 문제가 발생하였습니다.", error);
    }
  };

  const openModal = async (type) => {
    Modal.setAppElement('#root');
    await fetchData(type);
    setModalType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const updatedRows = isChecked
      ? [...checkedRows, id]
      : checkedRows.filter((rowId) => rowId !== id);

    setCheckedRows(updatedRows);
    setUpdateButtonDisabled(updatedRows.length === 0);
  };
  const handleUpdateCheckedRows = async () => {
    try 
    {
      const response = await fetch('/approval_of_membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRows: checkedRows,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await fetchData();

      response.json().then((data) => {
        alert(data.message);
        setCheckedRows([]);
        setUpdateButtonDisabled(true);
        closeModal();
      });
    } 
    catch (error) 
    {
      console.error('There has been a problem with your fetch operation:', error);
    }
    console.log('Checked rows:', checkedRows);
  };
  const renderModalContent = () => {
    if (modalType === 'approval') 
    {
      return (
        <ApprovalModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          studentInfo={studentInfo}
          handleCheckboxChange={handleCheckboxChange}
          handleUpdateCheckedRows={handleUpdateCheckedRows}
          isUpdateButtonDisabled={isUpdateButtonDisabled}
        />
      );
    } 
    else if (modalType === 'delete') 
    {
      return (
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          studentInfo={studentInfo}
        />
      );
    } 
    else 
    {
      return null;
    }
  };

  return (
    <div className="btn_section" id="manage_student">
      <button onClick={() => openModal('approval')} className="exam_register" id="approval">
        회원가입 승인
      </button>
      <button onClick={() => openModal('delete')} className="exam_register" id="delete">
        회원 삭제
      </button>
      {renderModalContent()}
      <button className="exam_register">시험문제 관리</button>
    </div>
  );
}
function StudentBtn()
{
  return(
    <div className='btn_section'>
      <button className="exam_register">
        <Link to = '/record'>시험결과 보러가기</Link>
      </button>
    </div>
  )
}

function MyInformation() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('/profile')
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP 오류 ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error('세션 정보를 가져오는 중 오류 발생:', error);
      });
  }, []);

  if (user.user_type === '학생') {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <UserInfoTable user={user} />
          <StudentBtn />
        </div>
      </div>
    );
  } else if (user.user_type === '선생') {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <UserInfoTable user={user} />
          <TeacherBtn />
        </div>
      </div>
    );
  }
}

export default MyInformation;
