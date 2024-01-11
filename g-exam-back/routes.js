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
        console.log({ studentInfo: rows });
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
    console.log(result);
    res.status(200).json({ message: 'Rows updated successfully' });
  } 
  catch (error) 
  {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing query' });
  }
})

module.exports = router;