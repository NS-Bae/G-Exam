const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const randomstring = require('randomstring');

const app = express();
const port = 4000;

const routes = require('./routes');
const db = require('./db/db');

const secret = randomstring.generate();

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));
app.use(bodyParser.urlencoded({ extended: false, limit: '1gb' }));
app.use(bodyParser.json({ limit: '1gb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
},
  async function (id, pw, done) {
    const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

    if (!usernamePattern.test(id) || !passwordPattern.test(pw)) {
      return done(null, false, { message: '잘못된 형식의 ID 또는 비밀번호입니다.' });
    }

    try {
      const [rows] = await db.promise().query('SELECT * FROM total_user WHERE id = ?', [id]);

      if (rows.length === 0) {
        console.log("등록되지 않은 사용자입니다.");
        return done(null, false, { message: "등록되지 않은 사용자입니다." });
      }

      const user = rows[0];
      user.ready = rows[0].ready;

      if (user.pw !== pw) {
        console.log('비밀번호가 일치하지 않습니다.');
        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }

      if (user.ready !== 1) {
        return done(null, false, { message: '계정이 승인되지 않았습니다. 관리자에게 계정의 승인을 요청하세요.' });
      }

      console.log('모든 정보가 일치합니다.', user.user_type);
      return done(null, user);

    } 
    catch (error) 
    {
      console.error('쿼리 오류:', error);
      return done(error);
    }
  }
));


app.use(session({
    secret: secret, // 세션 시크릿 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
}));

app.use(cors());
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM total_user WHERE id = ?', [id], function (err, results) {
        if (err || results.length === 0) {
        return done(err, null);
        }
        else{
          const userType = results[0].user_type;
          let tableName = '';
          switch (userType) {
              case '학생':
                  tableName = 'user_student';
                  break;
              case '선생':
                  tableName = 'user_teacher';
                  break;
              default:
                  tableName = 'total_user'; // 기본 테이블 선택
                  break;
          }

          // 선택된 테이블에서 정보 가져오기
          db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], function (err, userResults) {
              if (err || userResults.length === 0) {
                  return done(err, null);
              }
              const user = userResults[0];
              if (user.ready !== 1) {
                return done(null, false, { message: '계정이 준비되지 않았습니다.' });
              }
              // 로그인 성공 - 조건에 맞는 사용자 정보 반환
              return done(null, user);
          });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})