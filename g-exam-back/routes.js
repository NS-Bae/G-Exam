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
//변경 불필요.
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
        const sql = 'SELECT * FROM exam_word_record WHERE user_student_id = ?;';
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
//변경 불필요.
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
//변경 불필요.
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
//변경 불필요.
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
//변경 불필요.
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
//변경 불필요.
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
//변경 불필요.
router.post('/withgrawal', function(req, res) {
  const user = req.body;

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
//마지막숫자 가져오기
async function getLastNumber(target_table, selectedClassification) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT MAX(word_id) AS maxNnumber FROM ${target_table} WHERE word_category = ?;`;
    const params = [selectedClassification];

    db.query(sql, params, function (err, rows) {
      if (err) 
      {
        console.error('최신 번호 가져오기 오류:', err);
        reject('최신 번호 가져오기 오류');
      } 
      else
      {
        if (rows.length > 0)
        {
          const lastNumber = rows[0].maxNnumber;
          resolve(lastNumber);
        } 
        else 
        {
          resolve(0);
        }
      }
    });
  });
};
//변경 불필요. 영단어 정보가 포함된 word_id 가져오기
async function isWordTagExists(target_table, selectedClassification) {
  try 
  {
    const query = `SELECT COUNT(*) as count FROM ${target_table} WHERE word_category LIKE ?`;
    const values = [`%${selectedClassification}%`];

    return new Promise((resolve, reject) => {
      db.query(query, values, function (err, rows) {
        if (err) 
        {
          console.error('WordTag 확인 오류:', err);
          reject(err);
        } 
        else 
        {
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
};
//단어 저장 요청받은 백엔드
router.post('/save_word', async (req, res) => {
  const { wordSave, selectedClassification, selectedMajor } = req.body;
  const target_table = `word_${convertKorean(selectedMajor)}`;

  console.log(wordSave, selectedClassification, selectedMajor, target_table);

  const exist = await isWordTagExists(target_table, selectedClassification);
  try
  {
    if(exist)//기존 태그가 존재하는경우
    {
      const maxNnumber = await getLastNumber(target_table, selectedClassification) + 1;

      for (let i = 0; i < wordSave.length; i++) 
      {
        const newNumber = (maxNnumber + i);
        const engword = (wordSave[i]?.engWord) || '';
        const korword = (wordSave[i]?.korWord) || [];
        const korWords = wordSave[i].korWord.slice(0, 4); // 최대 4개까지만 유지
        const korword1 = korWords[0] || null;
        const korword2 = korWords[1] || null;
        const korword3 = korWords[2] || null;
        const korword4 = korWords[3] || null;
        const korword5 = korWords[4] || null;

        const query = `INSERT INTO ${target_table} VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [selectedClassification, newNumber, engword, korword1, korword2, korword3, korword4, korword5];      

        await db.execute(query, values);
      }
    }
    else//기존 태그가 존재하지 않는 경우
    {
      for (let i = 0; i < wordSave.length; i++) 
      {
        const newNumber = (1 + i);
        const engword = (wordSave[i]?.engWord) || '';
        const korword = (wordSave[i]?.korWord) || [];
        const korWords = wordSave[i].korWord.slice(0, 4); // 최대 4개까지만 유지
        const korword1 = korWords[0] || null;
        const korword2 = korWords[1] || null;
        const korword3 = korWords[2] || null;
        const korword4 = korWords[3] || null;
        const korword5 = korWords[4] || null;

        const query = `INSERT INTO ${target_table} VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [selectedClassification, newNumber, engword, korword1, korword2, korword3, korword4, korword5];      

        await db.execute(query, values);
      }
    }
    res.status(200).json({ message: `${wordSave.length} 단어가 성공적으로 저장되었습니다!` });
  }
  catch (error) 
  {
    console.error('단어 저장 오류:', error);
    res.status(500).json({ message: 'Error saving new words' });
  }
});
//변경 불필요. 태그 혹은 과목으로 등록된 모든 단어/문제 가져오기
router.post('/search_table', (req, res) => {
  const { selectedClassification, selectedMajor, offset } = req.body;
  const target_table = `word_${convertKorean(selectedMajor)}`;

  let sql;
  let countSql;
  console.log(selectedClassification);
  
  if (selectedClassification === '' || selectedClassification === 'select') 
  {
    sql = `SELECT * FROM ${target_table} LIMIT 15 OFFSET ${offset};`;
    countSql = `SELECT COUNT(*) as totalCount FROM ${target_table};`;
  } 
  else 
  {
    sql = `SELECT * FROM ${target_table} WHERE word_category = '${selectedClassification}' LIMIT 15 OFFSET ${offset};`;
    countSql = `SELECT COUNT(*) as totalCount FROM ${target_table} WHERE word_category = '${selectedClassification}';`;
  }

  db.query(countSql, (countErr, countResult) => {
    if (countErr) {
      console.log(countErr);
      res.status(500).json({ error: '' });
    } else {
      const totalCount = countResult[0].totalCount;

      db.query(sql, (err, result) => {
        if (err) 
        {
          console.log(err);
          res.status(500).json({ error: '' });
        } 
        else 
        {
          res.status(200).json({ data: result, totalCount });
        }
      });
    }
  });
});
//수정할 단어 불러오기
router.post('/update_word', async (req, res) => {
  const selectedRows = req.body.selectedRows;
  const selectedLevel = `word_${convertKorean(req.body.selectedLevel)}`;

  const placeholders = selectedRows.map(() => '(?, ?)').join(', ');
  const sql = `SELECT * FROM ${selectedLevel} WHERE (word_category, word_id) IN (${placeholders});`;
  try 
  {
    const compoundKeys = selectedRows.flatMap(({ wordCategory, wordId }) => [wordCategory, wordId]);

    const [result] = await db.promise().query(sql, compoundKeys);
    res.status(200).json({ result });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});
//변경 불필요. 개별단어 수정하기
router.post('/update_word_change', (req, res) => {
  const {updatedData, selectedLevel} = req.body;
  const selectedMajor = `word_${convertKorean(selectedLevel)}`;
  
  const updateQuery = `
    UPDATE ${selectedMajor}
    SET
    word = CASE WHEN ? IS NOT NULL THEN ? ELSE word END,
    word_mean1 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean1 END,
    word_mean2 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean2 END,
    word_mean3 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean3 END,
    word_mean4 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean4 END,
    word_mean5 = CASE WHEN ? IS NOT NULL THEN ? ELSE word_mean5 END
  WHERE word_id = ? AND word_category = ?;
  `;
  const values = [
    updatedData.word, updatedData.word,
    updatedData.word_mean1, updatedData.word_mean1,
    updatedData.word_mean2, updatedData.word_mean2,
    updatedData.word_mean3, updatedData.word_mean3,
    updatedData.word_mean4, updatedData.word_mean4,
    updatedData.word_mean5, updatedData.word_mean5,
    updatedData.word_id, updatedData.word_category
  ];
  console.log(updatedData, 'Executing SQL Query:', updateQuery, 'with values:', values);

  db.query(updateQuery, values, (error, result) => {
    if (error)
    {
      console.error('업데이트 쿼리 실핼중에 문제가 발생했습니다.', error);
    }
    else
    {
      console.log('업데이트에 성공했습니다.');
      res.status(200).json({ message : '업데이트에 성공했습니다.' });
    }
  })
});
//변경 불필요.
router.post('/delete_word', async (req, res) => {
  const selectedRows = req.body.selectedRows;
  const selectedLevel = `word_${convertKorean(req.body.selectedMajor)}`;
  
  const placeholders = selectedRows.map(() => '(?, ?)').join(', ');
  const sql = `DELETE FROM ${selectedLevel} WHERE (word_category, word_id) IN (${placeholders});`;

  try 
  {
    const compoundKeys = selectedRows.flatMap(({ wordCategory, wordId }) => [wordCategory, wordId]);

    const [result] = await db.promise().query(sql, compoundKeys);
    res.status(200).json({ message: 'Rows deleted successfully' });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
});
//한영전환 함수
function convertKorean(selectedCategory) 
{
  const conversion = {
    '국어' : 'korean', 
    '영어' : 'english', 
    '수학' : 'math', 
    '사회' : 'social', 
    '과학' : 'science', 
    '한문' : 'chinese_character', 
    '역사' : 'history', 
    '기타' : 'etc', 
  }

  return conversion[selectedCategory] || selectedCategory;
}
router.post('/search_exam', (req, res) => {
  const type = req.body.type;
  const search = req.body.search;
  const offset = req.body.offset;

  let sql;
  let countSql; 
  if(type === "workbook")
  {
    const major = `workbook_${convertKorean(req.body.selectedCategory)}`;
    
    if (search === 'select' || search === undefined || search === '') 
    {
      sql = `SELECT classification_name, exam_id, type FROM ${major} LIMIT 10 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM ${major};`;
    } 
    else 
    {
      sql = `SELECT classification_name, exam_id, type FROM ${major} WHERE classification_name = '${search}' LIMIT 10 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM ${major} WHERE classification_name = '${search}';`;
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
  }
  else if(type === "pre_exam")
  {
    const major = `pre_exam_${convertKorean(req.body.selectedCategory)}`;
    
    if (search === 'select' || search === '') 
    {
      sql = `SELECT classification_name, exam_id, type FROM ${major} LIMIT 10 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM ${major};`;
    } 
    else 
    {
      sql = `SELECT classification_name, exam_id, type FROM ${major} WHERE classification_name = '${search}' LIMIT 10 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM ${major} WHERE classification_name = '${search}';`;
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
  }
  else
  {
    return null;
  }
});

router.post('/delete_exam', async (req, res) => {
  const type = req.body.type;
  if(type === 'workbook')
  {
    const selectedRows = req.body.selectedRows;
    const selectedCategory = `workbook_${convertKorean(req.body.selectedCategory)}`;
    console.log(selectedCategory, 'aa', selectedRows);

    const placeholders = selectedRows.map(() => '(?, ?)').join(', ');
    const sql = `DELETE FROM ${selectedCategory} WHERE (classification_name, exam_id) IN (${placeholders});`;
    const compoundKeys = selectedRows.flatMap(({ examCatgory, examId }) => [examCatgory, examId]);

    try 
    {
      const [result] = await db.promise().query(sql, compoundKeys);
      res.status(200).json({ message: 'Rows deleted successfully' });
    } 
    catch (error) 
    {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    }
  }
  else if(type === 'pre_exam')
  {
    const selectedRows = req.body.selectedRows;
    const selectedCategory = `pre_exam_${convertKorean(req.body.selectedCategory)}`;
    console.log(selectedCategory, 'aa', selectedRows);

    const placeholders = selectedRows.map(() => '(?, ?)').join(', ');
    const sql = `DELETE FROM ${selectedCategory} WHERE (classification_name, exam_id) IN (${placeholders});`;
    const compoundKeys = selectedRows.flatMap(({ examCatgory, examId }) => [examCatgory, examId]);

    try 
    {
      const [result] = await db.promise().query(sql, compoundKeys);
      res.status(200).json({ message: 'Rows deleted successfully' });
    } 
    catch (error) 
    {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    }
  }
  else
  {
    return null;
  }
});

router.post('/show_exam', async (req, res) => {
  const type = req.body.type;
  const selectedRows = req.body.selectedRows;
  if(type === 'workbook')
  {
    const selectedClassification = req.body.selectedClassification;
    const target_table = `workbook_${convertKorean(req.body.selectedCategory)}`;

    sql = `SELECT * FROM ${target_table} WHERE exam_id = '${selectedRows}' AND classification_name = '${selectedClassification}';`;
    try 
    {
      const [result] = await db.promise().query(sql);
      res.status(200).json({ result });
    } 
    catch (error) 
    {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    }
  }
  else if(type === 'pre_exam')
  {
    const selectedCategory = `pre_exam_${convertKorean(req.body.selectedCategory)}`;

    sql = `SELECT * FROM ${selectedCategory} WHERE exam_id = '${selectedRows}';`;
    try 
    {
      const [result] = await db.promise().query(sql, selectedRows);
      res.status(200).json({ result });
    } 
    catch (error) 
    {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    }
  }
  else
  {
    return null;
  }
});

router.post('/update_exam', (req, res) => {
  const newFormData = req.body.newFormData;
  const type = req.body.type;
  const classification = req.body.classification;
  const examId = req.body.examId;
  const major = req.body.major;
  const setColumns = Object.keys(newFormData).map(column => `${column} = ?`).join(', ');
  let target_table;
  
  if(type === 'workbook')
  {
    target_table = `workbook_${convertKorean(major)}`;
  }
  else if(type === 'pre_exam')
  {
    target_table = `pre_exam_${convertKorean(major)}`;
  }
  else
  {
    return null;
  }
  const updateQuery = `
    UPDATE ${target_table}
    SET
      ${setColumns}
    WHERE exam_id = ? AND classification_name = ?;
  `;
  const values = [...Object.values(newFormData), examId, classification];

  console.log(setColumns, 'a', updateQuery, 'a', values);

  db.query(updateQuery, values, (error, result) => {
    if (error)
    {
      console.error('업데이트 쿼리 실핼중에 문제가 발생했습니다.', error);
      res.status(500).json({ error : '업데이트에 실패했습니다.' });
    }
    else
    {
      console.log('업데이트에 성공했습니다.');
      res.status(200).json({ message : '업데이트에 성공했습니다.' });
    }
  })
});

router.post('/search_classification', (req, res) => {
  const formType = req.body.form_type;
  const classification_category = req.body.selectedCategory;
  const offset = req.body.offset;
  
  let sql;
  let countSql;

  if(formType === "exam")
  {
    if(classification_category === 'select' || classification_category === '')
    {
      sql = `SELECT * FROM classification_list LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM classification_list;`;
    }
    else
    {
      sql = `SELECT * FROM classification_list WHERE major_name = '${classification_category}' LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM classification_list WHERE major_name = '${classification_category}';`
    }
  }
  else if(formType === "word")
  {
    if(classification_category === 'select' || classification_category === '')
    {
      sql = `SELECT * FROM word_category LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM word_category;`;
    }
    else
    {
      sql = `SELECT * FROM word_category WHERE major_name = '${classification_category}' LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM word_category WHERE major_name = '${classification_category}';`
    }
  }
  else if(formType === "pre_exam")
  {
    if(classification_category === 'select' || classification_category === '')
    {
      sql = `SELECT * FROM pre_exam_classification_list LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM pre_exam_classification_list;`;
    }
    else
    {
      sql = `SELECT * FROM pre_exam_classification_list WHERE major_name = '${classification_category}' LIMIT 15 OFFSET ${offset};`;
      countSql = `SELECT COUNT(*) as totalCount FROM pre_exam_classification_list WHERE major_name = '${classification_category}';`
    }
  }

  db.query(countSql, (countErr, countResult) => {
    if (countErr) 
    {
      console.log(countErr);
      res.status(500).json({ error: '' });
    } 
    else 
    {
      const totalCount = countResult[0].totalCount;

      db.query(sql, (err, result) => {
        if (err) 
        {
          console.log(err);
          res.status(500).json({ error: '' });
        } 
        else 
        {
          
          res.status(200).json({ data: result, totalCount });
        }
      });
    }
  });
  
});

async function getMaxId(table) 
{
  const table_now = table.table;
  let max_column;

  if(table_now === "word_category")
  {
    max_column = "word_id";
  }
  else if(table_now === "classification_list")
  {
    max_column = "classification_id";
  }

  const maxIdQuery = `SELECT MAX(${max_column}) AS maxId FROM ${table_now};`;
  return new Promise((resolve, reject) => {
    db.query(maxIdQuery, (error, results) => {
      if (error) 
      {
        console.error('Failed to get maxId:', error);
        reject(error);
      } 
      else 
      {
        const maxId = results && results.length > 0 ? results[0].maxId || 0 : 0;
        resolve(maxId);
      }
    });
  });
}

router.post('/add_classification', async (req, res) => {
  const tagValue = req.body.tagValue;
  const major = req.body.selectedCategory;
  const formType = req.body.form_type;
  const classification = `${major}_${tagValue}`;

  if(formType === "exam")
  {
    const table = "classification_list";
    try
    { 
      const sql = `INSERT INTO ${table} VALUES (?, 0, ?)`;
      const values = [classification, major];
  
      await db.execute(sql, values);
      res.status(200).json({ message: '문제분류를 등록하였습니다.' });
    }
    catch (error) 
    {
      console.error('문제분류 등록 오류:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  }
  else if(formType === "word")
  {
    const table = "word_category";
    try
    {
      const sql = `INSERT INTO ${table} VALUES (?, 0, ?)`;
      const values = [classification, major];
  
      await db.execute(sql, values);

      console.log(sql, "ssss");
      res.status(200).json({ message: '문제분류를 등록하였습니다.' });
    }
    catch (error) 
    {
      console.error('문제분류 등록 오류:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  }
  else if(formType === "pre_exam")
  {
    const table = "pre_exam_classification_list";
    const formData = req.body.formData;
    const formType = req.body.form_type;
    const classificationForm = `${formData.year}_${formData.school_details}_${formData.major}_${formData.grade}학년_${formData.semester}학기_${formData.period}고사`;
    let addTagClassification;    
    const sql = `INSERT INTO ${table} VALUES (?, 0, ?)`;
    let values;

    if(formData.tag === '')
    {
      values = [classificationForm, formData.major];
    }
    else
    {
      addTagClassification = `${classificationForm} ${formData.tag}`;
      values = [addTagClassification, formData.major];
    }
   
    try
    {
      await db.execute(sql, values);
      res.status(200).json({ message: '문제분류를 등록하였습니다.' });
    }
    catch (error) 
    {
      console.error('문제분류 등록 오류:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  }
});

router.post('/delete_classification', async (req, res) => {
  const target = req.body.checkedRows;
  const formType = req.body.form_type;
  const target_group = target.map(() => '?').join(', ');

  let target_table;
  let change_row;

  if(formType === "exam")
  {
    target_table = "classification_list";
    change_row = "classification_name";
  }
  else if(formType === "word")
  {
    target_table = "word_category";
    change_row = "word_category";
  }
  else if(formType === 'pre_exam')
  {
    target_table = "pre_exam_classification_list";
    change_row = "classification_name";
  }

  const sql = `DELETE FROM ${target_table} WHERE ${change_row} IN (${target_group});`;

  try
  {
    await db.execute(sql, target);
    res.status(200).json({ message: '문제분류를 삭제하였습니다.' });
  }
  catch (error) 
  {
    console.error('문제분류 삭제 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get_majorlist', (req, res) => {

  const sql = `SELECT major_name FROM major_list ORDER BY major_id;`;

  db.query(sql, (err, result) => {
    if (err) 
    {
      console.log(err);
      res.status(500).json({ error: err });
    } 
    else 
    {
      res.status(200).json({ data: result });
    }
  });
});

router.post('/get_classification', (req, res) => {
  const formType = req.body.form_type;
  const selectedMajor = req.body.selectedMajor;
  const detail_school = req.body.detail;
  let target_table;
  let target_row;
  let sql;

  console.log(formType, selectedMajor);

  if(formType === "exam")
  {
    target_table = "classification_list";
    target_row = "classification_name";
    
    sql = `SELECT ${target_row} FROM ${target_table} WHERE major_name = '${selectedMajor}';`;
    
    db.query(sql, (err, result) => {
      if (err) 
      {
        console.log(err);
        res.status(500).json({ error: '' });
      } 
      else 
      {
        console.log(result);
        res.status(200).json({ data: result });
      }
    });
  }
  else if(formType === "word")
  {
    target_table = "word_category";
    target_row = "word_category";
    
    sql = `SELECT ${target_row} FROM ${target_table} WHERE major_name = '${selectedMajor}';`;
    
    db.query(sql, (err, result) => {
      if (err) 
      {
        console.log(err);
        res.status(500).json({ error: '' });
      } 
      else 
      {
        console.log(result);
        res.status(200).json({ data: result });
      }
    });
  }
  else if(formType === "pre_exam")
  {
    console.log(detail_school, 'ss');
    target_table = "pre_exam_classification_list";
    target_row = "classification_name";

    if(detail_school !== undefined)
    {
      sql = `SELECT ${target_row} FROM ${target_table} WHERE major_name = '${selectedMajor}' AND classification_name LIKE '%${detail_school}%';`;
    }
    else
    {
      sql = `SELECT ${target_row} FROM ${target_table} WHERE major_name = '${selectedMajor}';`;
    }
    
    db.query(sql, (err, result) => {
      if (err) 
      {
        console.log(err);
        res.status(500).json({ error: '' });
      } 
      else 
      {
        console.log(result);
        res.status(200).json({ data: result });
      }
    });
  }
  else
  {
    return null;
  }
});

async function getNumber(classification, target_table) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT MAX(exam_id) AS maxNumber FROM ${target_table} WHERE classification_name = ?;`;
    const params = [classification];

    db.query(sql, params, function (err, rows) {
      if (err) 
      {
        console.error('최신 번호 가져오기 오류:', err);
        reject('최신 번호 가져오기 오류');
      } 
      else
      {
        const lastNumber = rows[0].maxNumber || 0;
        resolve(lastNumber);
      }
    });
  });
};

router.post('/regist_workbook_exam', async (req, res) => {
  const formData = req.body.formData;
  const examMajor = req.body.selectedExamMajor;
  const classification = req.body.selectedClassification;
  const type = formData.type;
  const paragraph = formData.paragraph || null;
  const question = formData.question || null;
  const image = formData.image || null;
  const choice1 = formData.choice1 || null;
  const choice2 = formData.choice2 || null;
  const choice3 = formData.choice3 || null;
  const choice4 = formData.choice4 || null;
  const choice5 = formData.choice5 || null;
  const answer = formData.answer || null;
  const target_table = `workbook_${convertKorean(examMajor)}`

  const problem_number = await getNumber(classification, target_table);
  
  try
  {
    const regist_query = `INSERT INTO ${target_table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [classification, problem_number + 1, type, paragraph, image, question, choice1, choice2, choice3, choice4, choice5, answer];
    await db.execute(regist_query, values);

    res.status(200).json({ message: '시험문제를 등록하였습니다.' });
  } 
  catch (error) 
  {
    console.error('시험문제 등록 오류:', error);
    throw error;
  }
});

router.post('/regist_pre_exam', async (req, res) => {
  const classification = req.body.selectedClassification;
  const major = req.body.selectedExamMajor;
  const formData = req.body.formData;
  const target_table = `pre_exam_${convertKorean(major)}`

  const problem_number = await getNumber(classification, target_table);

  console.log(classification, '4', major, '5', formData, '6', target_table, '7', problem_number);

  try
  {
    const regist_query = `INSERT INTO ${target_table} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [classification, problem_number + 1, major, formData.school_details, formData.type, formData.paragraph, formData.image, formData.question, formData.choice1, formData.choice2, formData.choice3, formData.choice4, formData.choice5, formData.answer];
    await db.execute(regist_query, values);

    res.status(200).json({ message: '시험문제를 등록하였습니다.' });
  } 
  catch (error) 
  {
    console.error('시험문제 등록 오류:', error);
    throw error;
  }

}); 

module.exports = router;