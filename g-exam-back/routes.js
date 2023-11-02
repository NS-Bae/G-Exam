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

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // 세션 정보가 있는 경우 세션 정보를 클라이언트로 보냅니다.
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: '로그인되지 않았습니다.' });
  }
});

router.post('/login', function(req, res, next)
{
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log('에러 발생: ', err);
      return res.status(500).json({ error: '에러 발생' });
    }
    if (!user) {
      console.log('사용자 인증 실패');
      return res.status(401).json({ error: '사용자 인증 실패' });
    }
    
    req.session.user = user;

    req.login(user, function(loginErr) {
      if (loginErr) {
        console.log('로그인 실패: ', loginErr);
        return res.status(500).json({ error: '로그인 실패' });
      }
      
      console.log('로그인 성공');
      return res.json({ message: '로그인 성공' });
    });
    
  })(req, res, next);
});

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // Check if the user is authenticated based on your authentication mechanism
    // If using Passport.js, you can use req.isAuthenticated() or req.user
    const user = req.session.user; // Access user information from the session

    res.json({ user: user });
  } else {
    res.status(401).json({ message: '로그인되지 않았습니다.' });
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

    const sql = 'INSERT INTO user_student VALUES (?, ?, ?, ?, ?, 0)';
    const params = [user_id, user_pw, name, school, grade];

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

    const sql = 'INSERT INTO user_teacher VALUES (?, ?, ?, ?)';
    const params = [user_id, user_pw, name, subject];

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
//세션 및 쿠키유지 개발 후 변경 필요.
router.get('/myinformation', (req, res) => {
  console.log(`Request received for ${req.url}`);
  db.query('SELECT * FROM user_student WHERE ready = false', function (error, results, fields) {
    if (error) 
    {
      console.error(error);
      res.status(500).send('Error retrieving data');
    } 
    else 
    {
      res.json(results);
    }
  });
});

module.exports = router;