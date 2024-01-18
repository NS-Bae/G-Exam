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
      <table className='third_table'>
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
      <div className='btn_section'>
        <button
          onClick={() => handleUpdateCheckedRows('approval')}
          disabled={isUpdateButtonDisabled}
          className="exam_register"
        >
          선택한 로우 업데이트
        </button>
        <button onClick={closeModal} className="exam_register">닫기</button>
      </div>
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
      <table className='third_table'>
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
                  onChange={(event) => handleCheckboxChange(event, item.id)}
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
      <div className='btn_section'>
        <button
          onClick={() => handleUpdateCheckedRows('delete')}
          disabled={isUpdateButtonDisabled}
          className="exam_register"
        >
          회원 삭제
        </button>
        <button onClick={closeModal} className="exam_register">닫기</button>
      </div>
    </Modal>
  );
};
const UpdateInfo = ({ modalIsOpen, closeModal, user }) => {
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const[schoolsList, setSchoolsList] = useState([]);

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
  const handleJoin = async (e) => {
    e.preventDefault();
    const formData = {
      user, 
      grade,
      school, 
      school_details: document.getElementById('school_details').value, // 학생 또는 교사 여부를 백엔드로 전달
    };

    fetch('/update_info', {
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
            alert(data.message);
            closeModal();
          } 
          else if (data.error) 
          {
            alert(data.error);
          }
        })
        .catch((error) => {
          console.error('네트워크 오류:', error);
        });

      setSchool('');
      setGrade('');
  };
  const withdrawal = async () => {
    const confirmation = window.confirm('정말로 회원을 탈퇴하시겠습니까?');

    if(confirmation)
    {
      fetch('/withgrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            closeModal();
            window.location.href = '/';
          } else if (data.error) {
            alert(data.error);
          }
        })
        .catch((error) => {
          console.error('네트워크 오류:', error);
        });
    }
    
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="회원정보 수정"
    >
      <h2>회원정보 수정</h2>
        <table className='third_table'>
          <thead>
            <tr>
              <th>분류</th>
              <th></th>
              <th>정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사용자 ID</td>
              <td> : </td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td> : </td>
              <td>{user.pw}</td>
            </tr>
            <tr>
              <td>사용자 이름</td>
              <td> : </td>
              <td>
                {user.name}
              </td>
            </tr>
            <tr>
              <td>사용자 분류</td>
              <td> : </td>
              <td>{user.user_type}</td>
            </tr>
            <tr>
              <td>사용자 학교</td>
              <td> : </td>
              <td>
                <div>
                  <div>
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
              </td>
            </tr>
            <tr>
              <td>사용자 학년</td>
              <td> : </td>
              <td>
                <input
                  id='grade'
                  type="text"
                  value={grade}
                  placeholder='학년'
                  onChange={(e) => setGrade(e.target.value)}
                />  
              </td>
            </tr>
          </tbody>
        </table>
        <div className='btn_section'>
          <button className="exam_register" onClick={handleJoin} type = "submit">정보 수정</button>
          <button onClick={closeModal} className="exam_register">닫기</button>
          <button className="exam_register" onClick={withdrawal}>회원 탈퇴</button>
        </div>
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
  
  const handleCheckboxChange = (event, id) => {
    setCheckedRows(prevRows => {
      const isChecked = event.target.checked;
      const updatedRows = isChecked
        ? [...prevRows, id]
        : prevRows.filter((rowId) => rowId !== id);
  
      setUpdateButtonDisabled(updatedRows.length === 0);
      return updatedRows;
    });
  };
  const handleUpdateCheckedRows = async (modalType) => {
    if(modalType === 'approval')
    {
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
    }
    else if(modalType === 'delete')
    {
      try 
      {
        const response = await fetch('/delete_of_membership', {
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
          setUpdateButtonDisabled(true);/* 
          closeModal(); */
        });
      } 
      catch (error) 
      {
        console.error('There has been a problem with your fetch operation:', error);
      }
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
          handleCheckboxChange={handleCheckboxChange}
          handleUpdateCheckedRows={handleUpdateCheckedRows}
          isUpdateButtonDisabled={isUpdateButtonDisabled}
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
      <button className="exam_register"><Link to ='/Regist'>시험문제 관리</Link></button>
    </div>
  );
}
function StudentBtn({user})
{
  Modal.setAppElement('#root');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = async (type) => {
    Modal.setAppElement('#root');
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };
  const renderModalContent = () => {
    return (
      <UpdateInfo
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        user = {user}
      />
    );
  };

  return(
    <div className='btn_section'>
      <button className="exam_register">
        <Link to = '/record'>시험결과 보러가기</Link>
      </button>
      <button onClick={() => openModal('update_info')} className="exam_register" id="update_info">
        정보수정
      </button>
      {renderModalContent()}
    </div>
  )
}

function MyInformation() {
  const [user, setUser] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/profile');
      if (!response.ok) {
        throw new Error('HTTP 오류 ' + response.status);
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('세션 정보를 가져오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (user.user_type === '학생') {
    return (
      <div className="background">
        <div className="wrap">
          <Main />
          <UserInfoTable user={user} />
          <StudentBtn user={user} />
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
