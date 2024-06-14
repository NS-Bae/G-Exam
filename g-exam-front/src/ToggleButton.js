import './App.css';
import React, { useState } from 'react';

const ToggleButton = ({item, form_type}) => {
  const [isPublic, setIsPublic] = useState(item.permission ? true : false);

  const handleToggle = () => {
    const changePermission = window.confirm('이 태그의 공개상태를 바꾸시겠습니까?');
    
    if(changePermission)
    {
      fetch('/api/update_tag_permission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classification : form_type === 'word' ? item.word_category : item.classification_name,
          now_permission : item.permission,
          form_type,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('네트워크의 응답이 좋지 않습니다.');
          }
          return response.json();
        })
        .then(({message}) => {
          alert(message);
          setIsPublic(!isPublic);
        })
        .catch((error) => {
          console.log('데이터 처리과정에서 문제가 발생하였습니다.', error);
        });
    }
    else
    {
      alert('안바꿈');
    }
  };

  return (
    <button onClick={handleToggle} className={isPublic ? 'public' : 'private'}>
      {isPublic ? '공개' : '비공개'}
    </button>
  );
};

export default ToggleButton;