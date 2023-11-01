const express = require('express');
const router = express.Router(); // 라우터 객체 생성
const db = require('./db/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const mysql = require('mysql2/promise');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser('keyboard cat'));
router.use(session({secret: 'keyboard cat'}));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(express.json());

router.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: process.env.COOKIS_SECRET, 
  cookie:{
    httpOnly:true,
    secure:false,
  }
}));

passport.serializeUser(function(user, done) { done(null, id); }); 
passport.deserializeUser(function(id, done) {
  user_id.findById(id, function(err, user) 
  
  { done(err, user); }); 


});

passport.use(new LocalStrategy({
  usernameField:'id', 
  passwordField:'pw',
},async function(id, pw, done)
{
  var sql='select id, pw from user_student where id like?;';
  var params=[id]; 
  db.query(sql, params, function(err, rows)
  {
    console.log(rows[0]);
    if(err) return done(err);
    if(rows.length === 0)
    {
      console.log("결과 없음");
      return done(null, false, { message: 'Incorrect' });
    }
    if(rows[0].pw!==pw) 
    { 
      console.log('비버니틀려용');
      return done(null, false, { message: "pw not found" });
    }
    if(rows[0].pw===pw)
    {
      console.log('비번이마자용');
      var user= rows[0];
      return done(null, user); 
    }
  })
}));

router.post('/login', async function(req, res, next)
{
  console.log(`Request received for ${req.url}`);
  passport.authenticate('local',(authError,user,info)=>{//로컬전략에따른 로그인시도 응답작성
    if(authError)
    {
      return res.json('user pww not found');
    }
    if(!user)
    {
      return res.json('user id not found');
    }
    return res.json('check');
  })
  (req,res,next);//미들웨어실행
});

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

router.post('/join_member', function(req, res) {
  const user_id = req.body.id;
  const user_pw = req.body.pw;
  const name = req.body.name;
  const school = req.body.school_details;
  const grade = req.body.grade;

  // 여기에서 유효성 검사 및 에러 처리를 수행할 수 있습니다.

  // 데이터베이스에 데이터 삽입
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
});

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