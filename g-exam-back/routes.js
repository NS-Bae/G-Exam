const express = require('express');
const router = express.Router(); // 라우터 객체 생성
const db = require('./db/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mysql = require('mysql2/promise');
const morgan = require('morgan');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(express.json());
//변경 불필요.
router.get('/checksession', (req, res) => {
  if(req.session && req.session.passport && req.session.passport.user) 
  {
    res.json({isLoggedIn : true});
    console.log("로그인되어있음");
  }
  else
  {
    res.json({isLoggedIn : false});
    console.log("로그인아님");
  }
});
//변경 불필요.
router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) 
  {
    res.json({ user: req.user });
  } 
  else 
  {
    res.status(401).json({ message: '로그인되지 않았습니다.' });
  }
});
//변경 불필요.
router.post('/login', function(req, res, next)
{
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log('에러 발생: ', err);
      return res.status(500).json({ error: '에러 발생' });
    }
    if (!user) {
      console.log('사용자 인증 실패', info.message);
      return res.status(401).json({ error: info.message });
    }

    req.session.user = {
      id: user.id,
      user_type: user.user_type
  };

    req.login(user, function(loginErr) {
      if (loginErr) {
        console.log('로그인 실패: ', loginErr);
        return res.status(500).json({ error: '로그인 실패' });
      }
      return res.json({ message: '로그인 성공' });
    });
    
  })(req, res, next);
});
//변경 불필요.
router.post('/logout', function(req, res) {
  // 세션에 passport의 user 정보가 있는지 확인
  if (req.session.passport && req.session.passport.user) {
     // 세션 파괴를 시도합니다.
     req.session.destroy(function (err) {
        if (err) {
           // 세션 파괴에 실패한 경우, 오류를 처리합니다.
           console.error('세션 파괴 중 오류 발생:', err);
           res.status(500).json({ error: '로그아웃 중 오류가 발생했습니다.' });
        } else {
           // 세션 파괴에 성공한 경우, 홈페이지로 리디렉션합니다.
           res.json({ success: true });
        }
     });
  } else {
     // 사용자 정보가 없을 때
     res.status(401).json({ error: '세션이 올바르게 초기화되지 않았습니다.' });
  }
});
//변경 불필요. 학교리스트 조회 가능.
router.get('/get_school_details', async (req, res) => {
  const schoolType = req.query.school;
  try {
    const sql = 'SELECT school_name FROM school_list WHERE school_grade = ?;';
    db.promise().query(sql, [schoolType])
      .then(([rows]) => {// 로그에 결과 확인
        res.json({ schoolDetails: rows });
      })
      .catch((error) => {
        console.error('Error retrieving schools:', error);
        res.status(500).json({ error: 'An error occurred while fetching schools.' });
      });
  } catch (error) {
    console.error('Error retrieving schools:', error);
    res.status(500).json({ error: 'An error occurred while fetching schools.' });
  }
});
//변경 불필요. 회원가입 완료
router.post('/join_member', function(req, res) {
  const formType = req.body.formType;
  if(formType === 'student')
  {
    const user_id = req.body.id;
    const user_pw = req.body.pw;
    const name = req.body.name;
    const school = req.body.school_details;
    const grade = req.body.grade;

    const sql = 'INSERT INTO user_student VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [user_id, user_pw, name, grade, 0, school, '학생'];

    console.log(user_id, user_pw, name, school, grade);
    
    db.query(sql, params, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: '데이터베이스에 저장 중 오류가 발생했습니다.' });
      } else {
        res.status(200).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
      }
    });
  }
  else if (formType === 'teacher')
  {
    const user_id = req.body.id;
    const user_pw = req.body.pw;
    const name = req.body.name;
    const subject = req.body.subject;

    const sql = 'INSERT INTO user_teacher VALUES (?, ?, ?, ?, ?, ?)';
    const params = [user_id, user_pw, name, 0, subject, '선생'];

    console.log(user_id, user_pw, name, subject);
    
    db.query(sql, params, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: '데이터베이스에 저장 중 오류가 발생했습니다.' });
      } else {
        res.status(200).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
      }
    });
  }
  else
  {
    console.log("formType이 잘못되었습니다.");
    res.status(400).json({ error: 'formType이 잘못되었습니다.' });
  }
});

router.post('/get_exam_record', (req, res) => {
  const { formType, user } = req.body;

  if (!formType || !user || !user.user_type) 
  {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  if(formType === "pre_exam")
  {
    if(user.user_type === '학생')
    {
      try {
        const sql = 'SELECT * FROM exam_record WHERE user_student_id = ?;';
        db.promise()
          .query(sql, [user.id])
          .then(([rows]) => {
            res.json({ examRecords: rows }); // 결과를 examRecords라는 키로 반환
          })
          .catch((error) => {
            console.error('시험 결과를 가져오는데 실패했습니다', error);
            res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
          });
      } catch (error) {
        console.error('시험 결과를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
      }
    }
    else if(user.user_type === '선생')
    {
      try {
        const sql = 'SELECT * FROM exam_record;';
        db.promise()
          .query(sql)
          .then(([rows]) => {
            res.json({ examRecords: rows }); // 결과를 examRecords라는 키로 반환
          })
          .catch((error) => {
            console.error('시험 결과를 가져오는데 실패했습니다', error);
            res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
          });
      } catch (error) {
        console.error('시험 결과를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
      }
    }
  }
  else if(formType === "eng_word")
  {
    if(user.user_type === '학생')
    {
      try {
        const sql = 'SELECT * FROM word_record WHERE user_student_id = ?;';
        db.promise()
          .query(sql, [user.id])
          .then(([rows]) => {
            res.json({ examRecords: rows }); // 결과를 examRecords라는 키로 반환
          })
          .catch((error) => {
            console.error('시험 결과를 가져오는데 실패했습니다', error);
            res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
          });
      } catch (error) {
        console.error('시험 결과를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
      }
    }
    else if(user.user_type === '선생')
    {
      try {
        const sql = 'SELECT * FROM word_record;';
        db.promise()
          .query(sql)
          .then(([rows]) => {
            res.json({ examRecords: rows }); // 결과를 examRecords라는 키로 반환
          })
          .catch((error) => {
            console.error('시험 결과를 가져오는데 실패했습니다', error);
            res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
          });
      } catch (error) {
        console.error('시험 결과를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '시험 결과를 가져오는데 실패했습니다' });
      }
    }
  }
  else
  {
    console.log("옳바르지 않은 요청입니다.");
  }
});

router.post('/change_state', (req, res) => {
  try {
    const sql = 'SELECT * FROM user_student WHERE ready = 0;';
    db.promise()
      .query(sql)
      .then(([rows]) => {
        res.json({ studentInfo: rows });
      })
      .catch((error) => {
        console.error('학생정보를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '학생정보를 가져오는데 실패했습니다' });
      });
  } catch (error) {
    console.error('학생정보를 가져오는데 실패했습니다', error);
    res.status(500).json({ error: '학생정보를 가져오는데 실패했습니다' });
  }
});

router.post('/approval_of_membership', async (req, res) => {
  const selectedRows = req.body.selectedRows;

  const placeholders = selectedRows.map(() => '?').join(', ');
  const sql = `UPDATE user_student SET READY = 1 WHERE id IN (${placeholders});`;

  try 
  {
    const [result] = await db.promise().query(sql, selectedRows);
    res.status(200).json({ message: 'Rows updated successfully' });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
})

router.post('/change_state_delete', (req, res) => {
  try 
  {
    const sql = 'SELECT * FROM user_student;';
    db.promise()
      .query(sql)
      .then(([rows]) => {
        res.json({ studentInfo: rows });
      })
      .catch((error) => {
        console.error('학생정보를 가져오는데 실패했습니다', error);
        res.status(500).json({ error: '학생정보를 가져오는데 실패했습니다' });
      });
  } 
  catch (error) 
  {
    console.error('학생정보를 가져오는데 실패했습니다', error);
    res.status(500).json({ error: '학생정보를 가져오는데 실패했습니다' });
  }
});

router.post('/delete_of_membership', async (req, res) => {
  const selectedRows = req.body.selectedRows;

  const placeholders = selectedRows.map(() => '?').join(', ');
  const sql = `DELETE FROM user_student WHERE id IN (${placeholders});`;

  try 
  {
    const [result] = await db.promise().query(sql, selectedRows);
    res.status(200).json({ message: 'Rows updated successfully' });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});

router.post('/update_info', function(req, res) {  
  const school = req.body.school_details;
  const grade = req.body.grade;
  const user = req.body.user;
  const id = user.id;

  const sql = `UPDATE user_student SET school_list_school_name = ?, grade = ? WHERE id = ?;`;
  const params = [school, grade, id];

  console.log(id, school, grade);
  
  db.query(sql, params, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: '데이터베이스에 저장 중 오류가 발생했습니다.' });
    } else {
      res.status(200).json({ message: '회원정보 수정이 성공적으로 완료되었습니다.' });
    }
  });
});

router.post('/withgrawal', function(req, res) {
  const user = req.body;
  console.log(user);

  const sql = `DELETE FROM user_student WHERE id = ?;`;
  const params = [user.id];

  db.query(sql, params, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: '데이터베이스에 저장 중 오류가 발생했습니다.' });
    } else {
      res.status(200).json({ message: '회원정보 수정이 성공적으로 완료되었습니다.' });
    }
  });
});

async function getLastNumber(selectedLevel) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT word_id FROM ${selectedLevel} ORDER BY word_id DESC LIMIT 1`;
    const params = [];

    db.query(sql, params, function (err, rows) {
      if (err) {
        console.error('최신 번호 가져오기 오류:', err);
        reject('최신 번호 가져오기 오류');
      } else {
        if (rows.length > 0) {
          const lastNumber = parseInt(rows[0].word_id.split('_').pop(), 10);
          resolve(lastNumber);
        } else {
          resolve(0);
        }
      }
    });
  });
}

async function saveNewWords(selectedLevel, wordTag, wordSave) {
  try {
    const exist = await isWordTagExists(selectedLevel, wordTag);
    
    if(exist > 0)
    {
      const lastNumber = await getLastNumber(selectedLevel);
      for (let i = 0; i < wordSave.length; i++) {
        const newNumber = (lastNumber + i + 1).toString().padStart(8, '0');
        const word_id = `${selectedLevel}_${wordTag}_${newNumber}`;
  
        const engword = (wordSave[i]?.engWord) || '';
        const korword = (wordSave[i]?.korWord) || [];
        const korWords = wordSave[i].korWord.slice(0, 4); // 최대 4개까지만 유지
        const korword1 = korWords[0] || null;
        const korword2 = korWords[1] || null;
        const korword3 = korWords[2] || null;
        const korword4 = korWords[3] || null;
  
        console.log(word_id, engword);
        console.log(korword);
  
        let query;
        let values;
  
        if (selectedLevel === "elementary") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '초등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        }
        else if (selectedLevel === "middle") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '중등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        } 
        else if (selectedLevel === "high") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '고등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        } 
        else if (selectedLevel === "toeic") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '토익')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        }
  
        await db.execute(query, values);
      }
    }
    else
    {
      const lastNumber = 0;
      for (let i = 0; i < wordSave.length; i++) {
        const newNumber = (lastNumber + i + 1).toString().padStart(8, '0');
        const word_id = `${selectedLevel}_${wordTag}_${newNumber}`;
  
        const engword = (wordSave[i]?.engWord) || '';
        const korword = (wordSave[i]?.korWord) || [];
        const korWords = wordSave[i].korWord.slice(0, 4); // 최대 4개까지만 유지
        const korword1 = korWords[0] || null;
        const korword2 = korWords[1] || null;
        const korword3 = korWords[2] || null;
        const korword4 = korWords[3] || null;
  
        console.log(word_id, engword);
        console.log(korword);
  
        let query;
        let values;
  
        if (selectedLevel === "elementary") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '초등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        }
        else if (selectedLevel === "middle") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '중등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        } 
        else if (selectedLevel === "high") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '고등')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        } 
        else if (selectedLevel === "toeic") 
        {
          query = `INSERT INTO ${selectedLevel} VALUES (?, ?, ?, ?, ?, ?, '토익')`;
          values = [word_id, engword, korword1, korword2, korword3, korword4];
        }
  
        await db.execute(query, values);
      }
    }
    return `${wordSave.length} 단어가 성공적으로 저장되었습니다!`;
  } 
  catch (error) 
  {
    console.error('단어 저장 오류:', error);
    throw error;
  }
}

async function isWordTagExists(selectedLevel, wordTag) {
  try 
  {
    console.log(wordTag);
    const query = `SELECT COUNT(*) as count FROM ${selectedLevel} WHERE word_id LIKE ?`;
    const values = [`%${wordTag}%`];

    console.log(query);

    return new Promise((resolve, reject) => {
      db.query(query, values, function (err, rows) {
        if (err) {
          console.error('WordTag 확인 오류:', err);
          reject(err);
        } else {
          console.log(rows);
          resolve(rows[0].count > 0);
        }
      });
    });
  } 
  catch (error) 
  {
    console.error('WordTag 확인 오류:', error);
    throw error;
  }
}

router.post('/save_eng_word', async (req, res) => {
  const { selectedCategory, selectedManagement, wordSave, selectedLevel, wordTag } = req.body;

  try 
  {
    const result = await saveNewWords(selectedLevel, wordTag, wordSave);
    res.status(200).json({ message: result });
  } 
  catch (error) 
  {
    res.status(500).json({ message: 'Error saving new words' });
  }

});

router.post('/search_table', (req, res) => {
  const form = req.body;
  const { selectedCategory, tagValue, selectedLevel, offset } = req.body;
  
  let sql;
  let countSql;
  
  if (tagValue === undefined) {
    sql = `SELECT word_id, word, word_mean1, word_mean2, word_mean3, word_mean4 FROM ${selectedLevel} LIMIT 10 OFFSET ${offset};`;
    countSql = `SELECT COUNT(*) as totalCount FROM ${selectedLevel};`;
  } else {
    sql = `SELECT word_id, word, word_mean1, word_mean2, word_mean3, word_mean4 FROM ${selectedLevel} WHERE word_id LIKE '%${tagValue}%' LIMIT 15 OFFSET ${offset};`;
    countSql = `SELECT COUNT(*) as totalCount FROM ${selectedLevel} WHERE word_id LIKE '%${tagValue}%';`;
  }

  db.query(countSql, (countErr, countResult) => {
    if (countErr) {
      console.log(countErr);
      res.status(500).json({ error: '' });
    } else {
      const totalCount = countResult[0].totalCount;

      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: '' });
        } else {
          res.status(200).json({ data: result, totalCount });
        }
      });
    }
  });
});

router.post('/delete_word', async (req, res) => {
  const selectedRows = req.body.selectedRows;
  const selectedLevel = req.body.selectedLevel;

  console.log(selectedRows, selectedLevel);

  const placeholders = selectedRows.map(() => '?').join(', ');
  const sql = `DELETE FROM ${selectedLevel} WHERE word_id IN (${placeholders});`;

  try 
  {
    const [result] = await db.promise().query(sql, selectedRows);
    res.status(200).json({ message: 'Rows updated successfully' });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});

router.post('/update_word', async (req, res) => {
  const selectedRows = req.body.selectedRows;
  const selectedLevel = req.body.selectedLevel;

  const placeholders = selectedRows.map(() => '?').join(', ');
  sql = `SELECT word_id, word, word_mean1, word_mean2, word_mean3, word_mean4 FROM ${selectedLevel} WHERE word_id IN (${placeholders});`;
  try 
  {
    const [result] = await db.promise().query(sql, selectedRows);
    console.log(result);
    res.status(200).json({ result });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});

router.post('/update_word_change', (req, res) => {
  const {updatedData, selectedLevel} = req.body;
  
  const updateQuery = `
    UPDATE ${selectedLevel}
    SET
    word = CASE WHEN ? IS NOT NULL THEN ? ELSE word END,
    word_mean1 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean1 END,
    word_mean2 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean2 END,
    word_mean3 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean3 END,
    word_mean4 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean4 END
  WHERE word_id = ?;
  `;
  const values = [
    updatedData.word, updatedData.word,
    updatedData.word_mean1, updatedData.word_mean1,
    updatedData.word_mean2, updatedData.word_mean2,
    updatedData.word_mean3, updatedData.word_mean3,
    updatedData.word_mean4, updatedData.word_mean4,
    updatedData.word_id
  ];

  db.query(updateQuery, values, (error, result) => {
    if (error)
    {
      console.error('업데이트 쿼리 실핼중에 문제가 발생했습니다.', error);
    }
    else
    {
      console.log('업데이트에 성공했습니다.', result);
      res.status(200).json({ message : '업데이트에 성공했습니다.' });
    }
  })


});
router.post('/regist_pre_exam', (req, res) => {
  const formData = req.body.formData;
  console.log(formData);
});
module.exports = router;