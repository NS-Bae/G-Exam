const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

const pool = mysql2.createPool({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam', 
});

connection.connect();

connection.query('SELECT school_name from school_list where (school_grade = "초등")', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end(); 

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../g-exam-front/build/index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express-session 미들웨어 설정
app.use(session({
  secret: 'Alpha1020', // 세션 데이터 암호화에 사용될 키 (반드시 변경)
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {successRedirect : '/', failureRedirect : '/login'}));

passport.use(new LocalStrategy(
  {
    usernameField : 'username', 
    passwordField : 'password'
  }, 
  function(username, password, done)
  {
    User.findOne({username:username}, function (err, user) {
      if(err) { return done(err);}
      if(!user) {
        return done(null, false, {message:"존재하지 않는 아이디입니다."});
      }
      if(!user.validPassword(password)) 
      {
        return done(null, false, {message:"비밀번호가 틀렸습니다."});
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.listen(port, () => {
  console.log('서버가 ${port}포트에서 실행 중입니다');
});

/* app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
}); */

/* const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam'
});

connection.connect();

connection.query('SELECT school_name from school_list where (school_grade = "초등")', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
  });
  
  connection.end(); */